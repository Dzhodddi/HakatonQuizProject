import websockets

def send_messages():
    uri = "ws://localhost:8765"
    with websockets.connect(uri) as websocket:
        websocket.send("Updated")
