<template>
  <div class="bg-black w-full overflow-hidden pb-[301px]">
    <div id="error-toast" class="toast"></div>
    
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
        <template v-if="isConnecting">
          <div class="icon-with-spinner">
            <div class="spinner"></div>
            <span>Connecting...</span>
          </div>
        </template>
        <template v-else>
          {{ buttonText }}
        </template>
      </button>
      
      <!-- <div v-if="showChatMessages" class="chat-container mt-8">
        <div class="chat-messages" ref="chatMessages">
          <div v-for="(message, index) in messages" :key="index" 
               class="message" :class="message.role">
            {{ message.content }}
          </div>
        </div>
      </div> -->
    </div>
    <audio id="audio-output" ref="audioOutput" v-show="false"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import Recorder from "recorder-core";
import "recorder-core/src/engine/wav";

const isStarted = ref(false);
const isSpeaking = ref(false);
const isBotSpeaking = ref(false);
const isConnecting = ref(false);
const buttonText = ref("Start Trial");
const webSocket = ref<WebSocket | null>(null);
const rec = ref<any>(null);
const webrtc_id = ref("");
const messages = ref<{role: string, content: string}[]>([]);
const showChatMessages = ref(false);
const chatMessages = ref<HTMLElement | null>(null);
const audioOutput = ref<HTMLAudioElement | null>(null);

let recordTimer: number | null = null;
let silenceTimer: number | null = null;
let isRecording = ref(false);
let lastVoiceTime = ref(0);
let peerConnection: RTCPeerConnection | null = null;
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let audioSource: MediaStreamAudioSourceNode | null = null;
let animationFrame: number | null = null;
let eventSource: EventSource | null = null;
let connectionTimeoutId: number | null = null;

const SILENCE_THRESHOLD = 0.5;
const SILENCE_DURATION = 1000;
const MIN_VOICE_DURATION = 500;
const MAX_RECORDING_DURATION = 30000;

const titleText = ref(null);
const botText = ref(null);
const imageBox = ref(null);
const startBtn = ref(null);

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

onUnmounted(() => {
  stopWebRTC();
  closeRecording();
  closeWebSocket();
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
});

function showError(message: string, isWarning = false) {
  const toast = document.getElementById('error-toast');
  if (toast) {
    toast.textContent = message;
    toast.className = isWarning ? 'toast warning' : 'toast error';
    toast.style.display = 'block';

    setTimeout(() => {
      if (toast) toast.style.display = 'none';
    }, 5000);
  }
}

function initialTemplate() {
  isStarted.value = !isStarted.value;
  buttonText.value = isStarted.value ? "End Trial" : "Start Trial";

  if (isStarted.value) {
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
  }
}

function initialRecording() {
  rec.value = Recorder({
    type: "wav",
    sampleRate: 16000,
    bitRate: 16,
    noiseSuppression: true,
    onProcess: (_buffer: any, powerLevel: number, duration: number) => {
      isBotSpeaking.value = false;
      // console.log(
      //   "Recording... Duration:",
      //   duration,
      //   "Power Level:",
      //   powerLevel
      // );

      if (powerLevel > SILENCE_THRESHOLD) {
        // 检测到声音
        lastVoiceTime.value = Date.now();
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }

        if (!isRecording.value) {
          isRecording.value = true;
          isSpeaking.value = true;
        }
      } else if (isRecording.value) {
        // 检测到静音
        const timeSinceLastVoice = Date.now() - lastVoiceTime.value;

        if (!silenceTimer && timeSinceLastVoice >= SILENCE_DURATION) {
          // 如果已经静音超过2秒，开始计时
          silenceTimer = window.setTimeout(() => {
            if (duration > MIN_VOICE_DURATION) {
              sendRecording();
            }
          }, SILENCE_DURATION);
        }
      }

      // 如果录音时间超过最大限制，强制发送
      if (duration >= MAX_RECORDING_DURATION) {
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }
        sendRecording();
      }
    },
  });

  rec.value.open(
    () => {
      rec.value.start();
      isRecording.value = false;
      isSpeaking.value = false;
      lastVoiceTime.value = 0;
    },
    (msg: string, isUserNotAllow: boolean) => {
      console.error("录音失败:", msg);
      if (isUserNotAllow) {
        showError("Please allow microphone access to use this feature.");
      }
    }
  );
}

function sendRecording() {
  if (!rec.value || !isRecording.value) return;

  rec.value.stop((_blob: Blob, _duration: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Audio = reader.result as string;
      const base64Data = base64Audio.split(",")[1];
      // console.log("录音数据:", base64Data);
      // console.log("录音时长:", duration, "ms");

      if (webSocket.value && webSocket.value.readyState === WebSocket.OPEN) {
        webSocket.value.send(base64Data);
        isBotSpeaking.value = false;
        isRecording.value = false;
        isSpeaking.value = false;
        if (rec.value) {
          rec.value.start();
        }
      }
    };
    reader.readAsDataURL(_blob);
  });
}

function stopRecording() {
  if (!rec.value || !isRecording.value) return;

  isRecording.value = false;
  isSpeaking.value = false;

  rec.value.stop(
    (_blob: Blob, _duration: number) => {
      if (rec.value) {
        rec.value.close();
        rec.value = null;
      }
    },
    (msg: string) => {
      console.error("录音停止失败:", msg);
      if (rec.value) {
        rec.value.close();
        rec.value = null;
      }
    }
  );
}

function closeRecording() {
  if (recordTimer) {
    clearTimeout(recordTimer);
    recordTimer = null;
  }

  if (silenceTimer) {
    clearTimeout(silenceTimer);
    silenceTimer = null;
  }

  if (rec.value) {
    rec.value.close();
    rec.value = null;
  }

  isRecording.value = false;
  isSpeaking.value = false;
  isBotSpeaking.value = false;
}

function initialWebSocket() {
  if (webSocket.value) {
    webSocket.value.close();
  }

  webSocket.value = new WebSocket("ws://acumenbot.com:9000/ws");

  webSocket.value.onopen = () => {
    console.log("WebSocket connected");
  };

  webSocket.value.onmessage = (event) => {
    console.log("Received message:", event.data);
    const words = event.data;
    isBotSpeaking.value = true;
    try {
      // if (words.toLowerCase().includes("hey bot")) {
        stopRecording();
        closeWebSocket();
        initializeWebRTC();
      // }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  webSocket.value.onerror = (error) => {
    console.error("WebSocket error:", error);
    isBotSpeaking.value = false;
    showError("WebSocket connection error. Please try again.");
  };

  webSocket.value.onclose = () => {
    console.log("WebSocket disconnected");
    isBotSpeaking.value = false;
  };
}

function closeWebSocket() {
  if (webSocket.value) {
    webSocket.value.close();
    webSocket.value = null;
  }
}

function setupAudioVisualization(stream: MediaStream) {
  if (audioContext) {
    audioContext.close();
  }
  
  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  audioSource = audioContext.createMediaStreamSource(stream);
  audioSource.connect(analyser);
  analyser.fftSize = 64;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function updateAudioLevel() {
    if (!analyser) return;
    
    analyser.getByteFrequencyData(dataArray);
    const average = Array.from(dataArray).reduce((a, b) => a + b, 0) / dataArray.length;
    const audioLevel = average / 255;

    // Update the light opacity based on audio level
    const light = document.querySelector('.light');
    if (light) {
      const opacity = 0.2 + audioLevel * 0.6;
      light.setAttribute('style', `opacity: ${opacity}`);
    }

    animationFrame = requestAnimationFrame(updateAudioLevel);
  }

  updateAudioLevel();
}

async function initializeWebRTC() {
  try {
    showChatMessages.value = true;
    isConnecting.value = true;
    
    if (connectionTimeoutId) {
      clearTimeout(connectionTimeoutId);
    }
    
    connectionTimeoutId = setTimeout(() => {
      showError("Connection is taking longer than usual. Are you on a VPN?", true);
    }, 5000);
    
    const config = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:acumenbot.com:3478" },
        {
          urls: "turn:acumenbot.com:5349",
          username: "user",
          credential: "password",
        },
      ],
    };

    peerConnection = new RTCPeerConnection(config);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    setupAudioVisualization(stream);

    stream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    peerConnection.addEventListener("track", (evt) => {
      console.log("🔊 Received audio stream", evt.streams);
      if (audioOutput.value && audioOutput.value.srcObject !== evt.streams[0]) {
        audioOutput.value.srcObject = evt.streams[0];
        audioOutput.value.play().catch(err => {
          console.error("Error playing audio:", err);
        });
      }
    });

    const dataChannel = peerConnection.createDataChannel("text");
    dataChannel.onmessage = (event) => {
      console.log("Data channel message:", event.data);
      try {
        const eventJson = JSON.parse(event.data);
        if (eventJson.type === "error") {
          showError(eventJson.message);
        }
      } catch (err) {
        console.error("Error parsing data channel message:", err);
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    await new Promise<void>((resolve) => {
      if (peerConnection?.iceGatheringState === "complete") {
        resolve();
      } else {
        const checkState = () => {
          if (peerConnection?.iceGatheringState === "complete") {
            peerConnection.removeEventListener("icegatheringstatechange", checkState);
            resolve();
          }
        };
        peerConnection?.addEventListener("icegatheringstatechange", checkState);
      }
    });

    peerConnection.addEventListener("connectionstatechange", () => {
      console.log("Connection state:", peerConnection?.connectionState);
      if (peerConnection?.connectionState === "connected") {
        isConnecting.value = false;
        isBotSpeaking.value = true;
        
        if (connectionTimeoutId) {
          clearTimeout(connectionTimeoutId);
          connectionTimeoutId = null;
        }
        
        const toast = document.getElementById('error-toast');
        if (toast) toast.style.display = 'none';
      } else if (peerConnection?.connectionState === "failed" || 
                 peerConnection?.connectionState === "disconnected" ||
                 peerConnection?.connectionState === "closed") {
        isConnecting.value = false;
        showError("Connection failed or disconnected. Please try again.");
      }
    });

    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
      } else {
        console.log("All ICE candidates have been gathered.");
      }
    });

    peerConnection.addEventListener("iceconnectionstatechange", () => {
      console.log("ICE Connection State:", peerConnection?.iceConnectionState);
    });

    webrtc_id.value = Math.random().toString(36).substring(7);

    const response = await fetch("https://acumenbot.ai:7860/webrtc/offer", {
      method: "POST",
      body: JSON.stringify({
        sdp: peerConnection.localDescription?.sdp,
        type: peerConnection.localDescription?.type,
        webrtc_id: webrtc_id.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    const serverResponse = await response.json();
    
    if (serverResponse.status === "failed") {
      showError(serverResponse.meta?.error === "concurrency_limit_reached"
        ? `Too many connections. Maximum limit is ${serverResponse.meta.limit}`
        : serverResponse.meta?.error || "Connection failed");
      stopWebRTC();
      return;
    }
    
    await peerConnection.setRemoteDescription(serverResponse);
    
    eventSource = new EventSource(`https://acumenbot.ai:7860/outputs?webrtc_id=${webrtc_id.value}`);
    eventSource.addEventListener("output", (event) => {
      try {
        const eventJson = JSON.parse(event.data);
        addMessage("assistant", eventJson.content);
      } catch (err) {
        console.error("Error parsing event source message:", err);
      }
    });
    
    addMessage("assistant", "Hello! How can I help you today?");
    
  } catch (err) {
    console.error("Error setting up WebRTC:", err);
    showError("Failed to establish connection. Please try again.");
    stopWebRTC();
  }
}

function addMessage(role: string, content: string) {
  messages.value.push({ role, content });
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
}

function stopWebRTC() {
  isConnecting.value = false;
  
  if (connectionTimeoutId) {
    clearTimeout(connectionTimeoutId);
    connectionTimeoutId = null;
  }
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  
  if (audioContext) {
    audioContext.close();
    audioContext = null;
    analyser = null;
    audioSource = null;
  }
  
  if (peerConnection) {
    if (peerConnection.getTransceivers) {
      peerConnection.getTransceivers().forEach(transceiver => {
        if (transceiver.stop) {
          transceiver.stop();
        }
      });
    }
    
    if (peerConnection.getSenders) {
      peerConnection.getSenders().forEach(sender => {
        if (sender.track && sender.track.stop) {
          sender.track.stop();
        }
      });
    }
    
    peerConnection.close();
    peerConnection = null;
  }
  
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  
  messages.value = [];
  showChatMessages.value = false;
}

function start() {
  initialTemplate();
  if (isStarted.value) {
    initialWebSocket();
    initialRecording();
  } else {
    stopWebRTC();
    closeRecording();
    closeWebSocket();
  }
}
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
    rgba(143, 255, 169, .5) 0%,
    rgba(143, 255, 169, 0) 100%
  );
}

.bot-light {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(25, 201, 255, 0.8) 0%,
    rgba(25, 201, 255, 0) 100%
  );
}

.chat-container {
  width: 100%;
  max-width: 800px;
  border: 1px solid #333;
  padding: 20px;
  box-sizing: border-box;
}

.chat-messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
}

.message {
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  
  &.user {
    background-color: #1a1a1a;
    margin-left: 20%;
  }
  
  &.assistant {
    background-color: #262626;
    margin-right: 20%;
  }
}

.icon-with-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 120px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #000;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 24px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  display: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &.error {
    background-color: #f44336;
    color: white;
  }
  
  &.warning {
    background-color: #ffd700;
    color: black;
  }
}
</style>
