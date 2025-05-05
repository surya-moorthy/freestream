import { useEffect, useState } from "react"

export default function Sender() {
    const [socket,setSocket] = useState<WebSocket | null>(null);
    const [pc,setPc] = useState<RTCPeerConnection | null>(null);

    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:8080");
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "sender"
            }))
        }
    })

    const initiateConn = async () => {

    }
    const getCameraStreamAndSend = async () => {

    }
    return (
      <div>
        Sender
        <button onClick={initiateConn}>Click to Connect</button>
        
      </div>
    )
  }
  