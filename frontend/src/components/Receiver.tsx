import { useEffect } from "react"

export default function Receiver() {
    useEffect(()=>{
        const socket= new WebSocket("http://localhost:8080");
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    type : "receiver",
                })
            )
            Startreceiving(socket);
        }
        function Startreceiving(socket : WebSocket) {

        }
    })
  return (
    <div>
        
    </div>
  )
}
