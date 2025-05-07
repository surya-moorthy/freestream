import { useEffect } from "react"

export default function Receiver() {
    useEffect(()=>{
        const socket= new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    type : "receiver",
                })
            )
            socket.onmessage = async (event) => {
                console.log(event.data);
                const message = JSON.parse(event.data);
                
                if(event.type == "createOffer"){
                    const rtc = new RTCPeerConnection();
                    rtc.setRemoteDescription(message.sdp);
                    console.log("offer accepted:", message.sdp);
                    rtc.onicecandidate = (event) => {
                        socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}))

                    }
                    const answer =await rtc.createAnswer();
                    await rtc.setLocalDescription(answer);
                    socket.send(JSON.stringify({type : "createAnswer",sdp : answer.sdp}))
                    console.log("receiver localdescription:",answer.sdp)
                }          
              }
        }
    },[])
    
  return (
    <div>
        hi there
    </div>
  )
}
