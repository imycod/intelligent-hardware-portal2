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
    <audio id="audio-output" v-show="false"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import Recorder from "recorder-core";
import "recorder-core/src/engine/wav";

const isStarted = ref(false);
const isSpeaking = ref(false);
const isBotSpeaking = ref(false);
const buttonText = ref("Start Trial");
const webSocket = ref<WebSocket | null>(null);
const rec = ref<any>(null);
let recordTimer: number | null = null;
let silenceTimer: number | null = null;
let isRecording = ref(false);
let lastVoiceTime = ref(0);
let peerConnection: RTCPeerConnection | null = null;
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
    onProcess: (buffer: any, powerLevel: number, duration: number) => {
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
        alert("请允许使用麦克风");
      }
    }
  );
}

function sendRecording() {
  if (!rec.value || !isRecording.value) return;

  rec.value.stop((blob: Blob, duration: number) => {
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
    reader.readAsDataURL(blob);
  });
}

function stopRecording() {
  if (!rec.value || !isRecording.value) return;

  isRecording.value = false;
  isSpeaking.value = false;

  rec.value.stop(
    (blob: Blob, duration: number) => {
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

async function initializeWebRTC() {
  try {
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

    // 获取音频流
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 添加音频轨道到连接
    stream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    peerConnection.addEventListener("track", (evt) => {
      console.log("🔊 接收到音频流", evt.streams);
      if (audioOutput.srcObject !== evt.streams[0]) {
        audioOutput.srcObject = evt.streams[0];
        audioOutput.play();
      }
    });

    // 创建数据通道
    const dataChannel = peerConnection.createDataChannel("text");
    dataChannel.onmessage = (event) => {
      console.log("event.data---", event.data);
    };

    // 创建并设置本地描述
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // 监听连接状态变化
    peerConnection.addEventListener("connectionstatechange", () => {
      console.log("connectionstatechange", peerConnection?.connectionState);
      if (peerConnection?.connectionState === "connected") {
        isBotSpeaking.value = true;
      }
    });

    // 发送 offer 到服务器
    const response = await fetch("https://acumenbot.ai:7860/webrtc/offer", {
      method: "POST",
      body: JSON.stringify({
        sdp: offer.sdp,
        type: "offer",
        webrtc_id: Math.random().toString(36).substring(7),
      }),
      headers: { "Content-Type": "application/json" },
    });
    const serverResponse = await response.json();
    // 设置远程描述
    await peerConnection.setRemoteDescription(serverResponse);
  } catch (err) {
    console.error("Error setting up WebRTC:", err);
  }
}

function start() {
  initialTemplate();
  if (isStarted.value) {
    initialWebSocket();
    initialRecording();
  } else {
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
