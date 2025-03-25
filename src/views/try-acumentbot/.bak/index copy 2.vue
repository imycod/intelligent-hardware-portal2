<template>
  <div class="bg-black w-full overflow-hidden pb-[301px]">
    <div
      class="max-w-[1920px] mx-auto flex flex-col items-center px-4 md:px-8 text-white"
    >
      <div
        ref="titleText"
        class="text-white mt-[233px] title opacity-0"
        v-show="!isStarted"
      >
        Press the button to start your 5-minute free trial
      </div>
      <div
        ref="botText"
        class="text-white mt-[233px] title opacity-0"
        v-show="isStarted"
      >
        Say 'Hey Bot' into your microphone to start the conversation
      </div>

      <div
        ref="imageBox"
        class="image-box mt-[126px] opacity-0 relative"
        v-show="isStarted"
      >
        <div
          v-show="isSpeaking || isBotSpeaking"
          :class="[
            'light',
            { 'bot-light': isBotSpeaking, 'user-light': isSpeaking },
          ]"
          class="absolute top-[80px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        ></div>
        <img
          v-show="!isSpeaking && !isBotSpeaking"
          src="@/assets/bot/noactive.png"
          alt=""
          class="noactive relative z-10"
        />
        <img
          v-show="isSpeaking"
          src="@/assets/bot/active-blue.png"
          alt=""
          class="active-blue relative z-10"
        />
        <img
          v-show="isBotSpeaking"
          src="@/assets/bot/active-sky.png"
          alt=""
          class="active-sky relative z-10"
        />
      </div>

      <button
        ref="startBtn"
        class="start cursor-pointer opacity-0"
        @click="start"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const isStarted = ref(false);
const isSpeaking = ref(true);
const isBotSpeaking = ref(false);
const buttonText = ref("Start Trial");

const titleText = ref(null);
const botText = ref(null);
const imageBox = ref(null);
const startBtn = ref(null);

let webSocket: WebSocket | null = null;
let peerConnection: RTCPeerConnection | null = null;
let mediaStream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let speechRecognition: any = null;

const NOISE_THRESHOLD = 0.01; // Noise threshold
const SILENCE_DURATION = 500; // Silence duration threshold (ms)
let silenceTimer = 0;
let isActivelySpeaking = false;

// Add these variables near other ref declarations
let audioBuffer: Int16Array[] = [];
let sendAudioTimeout: NodeJS.Timeout | null = null;
const DEBOUNCE_DELAY = 300; // 300ms debounce delay

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  tl.fromTo(
    titleText.value,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    }
  ).fromTo(
    startBtn.value,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    "-=0.3"
  );
});

function onMessage(event: MessageEvent) {
  const data = event.data
  console.log(data)
  if (data.type === "rtc_offer") {
    handleRTCOffer(data.offer);
  } else if (data.type === "bot_speaking") {
    isBotSpeaking.value = data.speaking;
  }
}


function createWavHeader(
  sampleRate: number,
  bitsPerSample: number,
  numberOfChannels: number,
  dataLength: number
) {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, "WAVE");

  // fmt sub-chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, numberOfChannels, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numberOfChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  writeString(view, 36, "data");
  view.setUint32(40, dataLength, true);

  return new Uint8Array(buffer);
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function onAudioprocess(e: AudioProcessingEvent) {
  const inputData = e.inputBuffer.getChannelData(0);
  const energy = inputData.reduce((acc, val) => acc + Math.abs(val), 0) / inputData.length;

  if (energy > NOISE_THRESHOLD) {
    silenceTimer = 0;
    if (!isActivelySpeaking) {
      isActivelySpeaking = true;
      isSpeaking.value = true;
    }

    // Convert to 16-bit PCM data
    const pcmData = new Int16Array(inputData.length);
    for (let i = 0; i < inputData.length; i++) {
      pcmData[i] = inputData[i] * 0x7fff;
    }

    // Add to buffer instead of sending immediately
    audioBuffer.push(pcmData);

    // Clear existing timeout if there is one
    if (sendAudioTimeout) {
      clearTimeout(sendAudioTimeout);
    }

    // Set new timeout to send buffered audio
    sendAudioTimeout = setTimeout(() => {
      if (audioBuffer.length > 0) {
        // Combine all buffered audio data
        const totalLength = audioBuffer.reduce((acc, buf) => acc + buf.length, 0);
        const combinedPcmData = new Int16Array(totalLength);
        let offset = 0;
        
        audioBuffer.forEach(buf => {
          combinedPcmData.set(buf, offset);
          offset += buf.length;
        });

        // Create WAV header for combined data
        const wavHeader = createWavHeader(
          audioContext!.sampleRate,
          16,
          1,
          combinedPcmData.byteLength
        );

        // Combine WAV header and audio data
        const wavData = new Uint8Array(wavHeader.length + combinedPcmData.byteLength);
        wavData.set(wavHeader);
        wavData.set(new Uint8Array(combinedPcmData.buffer), wavHeader.length);

        // Convert to base64 and send
        const chunkSize = 1024;
        let base64Data = '';
        for (let i = 0; i < wavData.length; i += chunkSize) {
            const chunk = wavData.slice(i, i + chunkSize);
            base64Data += String.fromCharCode.apply(null, chunk);
        }
        const encodedData = btoa(base64Data);
        webSocket?.send(encodedData);

        // Clear the buffer
        audioBuffer = [];
      }
    }, DEBOUNCE_DELAY);
  } else {
    silenceTimer += (1024 / audioContext!.sampleRate) * 1000;
    if (silenceTimer > SILENCE_DURATION && isActivelySpeaking) {
      isActivelySpeaking = false;
      isSpeaking.value = false;
      
      // Send any remaining buffered audio when speech ends
      if (audioBuffer.length > 0) {
        if (sendAudioTimeout) {
          clearTimeout(sendAudioTimeout);
        }
        sendAudioTimeout = setTimeout(() => {
          // ... (same sending logic as above)
        }, DEBOUNCE_DELAY);
      }
    }
  }
}

function handleWebSocketEvents() {
  webSocket = new WebSocket("ws://acumenbot.com:9000/ws");
  webSocket.onmessage = onMessage;
  // webSocket.onerror = onError;
  // webSocket.onclose = onClose;
  // webSocket.onopen = onOpen;
}

function initializeSpeechRecognition() {
  speechRecognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.onresult = handleSpeechResult;
  speechRecognition.onend = () => speechRecognition.start();
}

async function initializeAudioContext() {
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(mediaStream);
  const processor = audioContext.createScriptProcessor(1024, 1, 1);
  
  processor.onaudioprocess = onAudioprocess;
  
  source.connect(processor);
  processor.connect(audioContext.destination);
}

async function start() {
  try {
    if (!isStarted.value) {
      handleWebSocketEvents();
      initializeSpeechRecognition();
      await initializeAudioContext();

      speechRecognition.start();
      isStarted.value = true;
      buttonText.value = "End Trial";

      gsap.fromTo(
        [botText.value, imageBox.value],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    } else {
      cleanupResources();
      isStarted.value = false;
      buttonText.value = "Start Trial";
    }
  } catch (error) {
    console.error("Error starting session:", error);
    cleanupResources();
  }
}

function handleSpeechResult(event: any) {
  const transcript = Array.from(event.results)
    .map((result: any) => result[0])
    .map((result: any) => result.transcript)
    .join("");

  if (transcript.toLowerCase().includes("hey bot")) {
    webSocket?.send(JSON.stringify({ type: "wake_word_detected" }));
  }
}

function handleAudioProcess(e: AudioProcessingEvent) {
  if (peerConnection?.connectionState === "connected") {
    // 处理音频数据并通过WebRTC发送
    const inputData = e.inputBuffer.getChannelData(0);
    // 这里添加音频数据处理和发送的逻辑
  }
}

async function handleRTCOffer(offer: RTCSessionDescriptionInit) {
  try {
    peerConnection = new RTCPeerConnection();
    peerConnection.ontrack = handleTrack;
    mediaStream
      ?.getTracks()
      .forEach((track) => peerConnection.addTrack(track, mediaStream!));

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    webSocket?.send(
      JSON.stringify({
        type: "rtc_answer",
        answer: peerConnection.localDescription,
      })
    );
  } catch (error) {
    console.error("Error handling RTC offer:", error);
  }
}

function handleTrack(event: RTCTrackEvent) {
  const audioElement = new Audio();
  audioElement.srcObject = event.streams[0];
  audioElement.play();
}

function cleanupResources() {
  if (sendAudioTimeout) {
    clearTimeout(sendAudioTimeout);
  }
  audioBuffer = [];
  
  webSocket?.close();
  webSocket = null;

  peerConnection?.close();
  peerConnection = null;

  mediaStream?.getTracks().forEach((track) => track.stop());
  mediaStream = null;

  audioContext?.close();
  audioContext = null;

  if (speechRecognition) {
    speechRecognition.stop();
    speechRecognition = null;
  }

  isSpeaking.value = false;
  isBotSpeaking.value = false;
}

onUnmounted(() => {
  cleanupResources();
});
</script>

<style lang="scss" scoped>
.title {
  color: #fff;
  text-align: center;
  font-family: "SF Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 410;
  line-height: normal;
}

.start {
  width: 215px;
  height: 77px;
  display: inline-flex;
  padding: 24px 48px;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: "SF Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 270;
  line-height: normal;
  border-radius: 50px;
  background: #fbcbc1;
  margin-top: 150px;
}

.image-box {
  position: relative;
  width: 664.27px;
  height: 383.319px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.light {
  width: 664.27px;
  height: 383.319px;
  transform: rotate(-159.125deg);
  border-radius: 664.27px;
  filter: blur(15px);
  pointer-events: none;
}

.user-light {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(143, 255, 169, 0.3) 0%,
    rgba(143, 255, 169, 0) 100%
  );
}

.bot-light {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(25, 201, 255, 0.4) 0%,
    rgba(25, 201, 255, 0) 100%
  );
}
</style>
