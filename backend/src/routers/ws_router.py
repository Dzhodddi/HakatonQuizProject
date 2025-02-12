import websockets
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from constants import WEBSOCKET_LOG_DIR

ws_router = APIRouter()


@ws_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Accept the connection from the client
    await websocket.accept()
    try:
        while True:
            # Receive message from client
            message = await websocket.receive_text()

            with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                if f.read() == "Updated":
                    await websocket.send_text("Updated")

            if message == "Clear":
                with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                    f.write("Clear")

            # await websocket.send_text(f"Message received: {message}")
    except WebSocketDisconnect:
        print("Client disconnected")
