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
            with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                # if f.read() == "Updated":
                #     print("Successfully updated")
                await websocket.send_text(f"{f.read()}")

            message = await websocket.receive_text()
            with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
                f.write(f"{message}")


            # if message == "Clear":


    except WebSocketDisconnect:
        print("Client disconnected")
