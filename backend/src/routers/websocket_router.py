from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from constants import WEBSOCKET_LOG_DIR

ws_router = APIRouter()

@ws_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            if data == "Clear":
                with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                    f.write(f"{data}")
            else:
                continue
    except WebSocketDisconnect:
        print("Client disconnected")

