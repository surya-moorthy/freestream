import { useEffect, useState } from "react"

export default function Sender() {
    const [socket,setSocket] = useState<WebSocket | null>(null);
    const [rtc,setrtc] = useState<RTCPeerConnection | null>(null);
    const [localvideo,setVideo] = useState<HTMLElement>();

    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:8080");
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "sender"
            }))
        }
    },[])

    const initiateConn = async () => {
     if(!socket) {return}
      const rtc = new RTCPeerConnection();
      const offer = await rtc.createOffer();
      rtc.setLocalDescription(offer);
      console.log("creating an offer with sdp:" + offer.sdp);

      rtc.onicecandidate = (event) =>{
        if(event.candidate){
           socket?.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}))
        }
     }
     socket.send(JSON.stringify({type : "createOffer",sdp : offer.sdp}))

     socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
       if(message.type === "createAnswer"){
          rtc.setRemoteDescription(message.sdp)
       }
       else if(event.type === "iceCandidate"){
        rtc.addIceCandidate(message.candidate)
       }
     }
     setrtc(rtc);
    }
    const getCameraStreamAndSend = async () => {
      const openMediaDevices = async (constraints) => {
        return await navigator.mediaDevices.getUserMedia(constraints);
    }
    
    try {
        const stream = openMediaDevices({'video':true,'audio':true});
        console.log('Got MediaStream:', stream);
        
        const getVideoMedia = await navigator.mediaDevices.getUserMedia({video : true})
        const video = document.createElement('video')
        setVideo(video);
        video.srcObject = getVideoMedia;
        video.play()
        document.body.appendChild(localvideo);
        getVideoMedia.getTracks().forEach((track)=>{
          rtc?.addTrack(track)
        })
    } catch(error) {
        console.error('Error accessing media devices.', error);
    }
    }
    const RemoveVideo = () =>{
          
    }
    return (
      <div>
        Sender
        <button onClick={initiateConn}>Click to Connect</button>
        <button onClick={getCameraStreamAndSend}>Stream</button>
        <button onClick={RemoveVideo}>
          Remove video
        </button>
      </div>
    )
  }
  