import base64
import logging

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from google.cloud.speech_v1 import SpeechClient

from transcribe import transcribe_audio

# Google Speech API 客户端
speech_client = SpeechClient()

# 处理 WebSocket 连接
async def websocket_handler(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # 等待接收音频数据
            message = await websocket.receive_text()
            logging.info("收到信息：", message)
            audio_data = base64.b64decode(message)
            text = transcribe_audio(audio_data)
            if text:
                logging.info("返回内容: ", text)
                await websocket.send_text(text)
            else:
                logging.info("无法识别")

    except WebSocketDisconnect:
        print("Client disconnected")

# FastAPI WebSocket 路由
app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_handler(websocket)

# 启动应用
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
