import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer();

let senderSocket : WebSocket | null = null;
let receiverSocket : WebSocket | null = null;

wss.on("connection", function connection(ws) {
    ws.on("error",console.error);
    ws.on("message", function message(data){
        const message = JSON.parse(data.toString());
        if(message.type == "sender"){
             senderSocket = ws;
        }
        else if(message.type == "receiver"){
            receiverSocket = ws;
        }
        else if(message.type == "createOffer"){
            if(ws !== senderSocket){return};
            receiverSocket?.send(JSON.stringify({type :  "createOffer" , sdp : message.sdp}))
        }
        else if(message.type == "createAnswer"){
            if(ws !== receiverSocket){return};
            senderSocket?.send(JSON.stringify({type :  "createAnswer" , sdp : message.sdp}))
        } 
        else if(message.type == "iceCandidate") {
           if(ws === senderSocket){
              receiverSocket?.send(JSON.stringify({type : "iceCandidate",message : message.candidate}))
           } 
           if(ws === receiverSocket){
              senderSocket?.send(JSON.stringify({type : "iceCandidate",message : message.candidate}))
           } 
        }

    })

    ws.send("connection with:" + ws.url);
})

