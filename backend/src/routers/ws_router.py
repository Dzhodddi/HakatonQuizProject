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
            with open(f"{WEBSOCKET_LOG_DIR}ws.log", "r") as f:
                if f.read() == "Updated":
                    print("Successfully updated")
                    await websocket.send_text(f"{f.read()}")

            message = await websocket.receive_text()
            with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                if message == "Clear":
                    f.write(f"{message}")

    except WebSocketDisconnect:
        print("Client disconnected")



@ws_router.get("/get_ws_status")
async def get_ws_status():
    with open(f"{WEBSOCKET_LOG_DIR}ws.log", "r") as f:
        return {"status" : f.read()}