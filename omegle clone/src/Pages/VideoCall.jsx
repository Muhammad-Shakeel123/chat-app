import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SOCKET_URL = "http://localhost:8080"; // ⚠️ Use polling if wss fails

const VideoChatRoom = () => {
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const userId = useSelector((state) => state.Current_User?._id);
  const roomId = useSelector((state) => state.CreateSession?.roomId);

  // 1. Connect to socket
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["polling"], // prevent wss errors on Vercel
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // 2. Join the room
  useEffect(() => {
    if (socket && roomId && userId) {
      socket.emit("join-room", { roomId, userId });

      socket.on("user-joined", async ({ userId: remoteId }) => {
        console.log("User joined:", remoteId);
        await createOffer();
      });

      socket.on("offer", async ({ sdp }) => {
        await createAnswer(sdp);
      });

      socket.on("answer", async ({ sdp }) => {
        if (peerConnection) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        }
      });

      socket.on("ice-candidate", ({ candidate }) => {
        if (peerConnection && candidate) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
    }
  }, [socket, roomId, userId, peerConnection]);

  // 3. Get user's camera/mic stream
 useEffect(() => {
   const getMedia = async () => {
     try {
       if (useFakeStream) {
         // Simulated remote peer using a video file
         const videoElement = document.createElement('video');
         videoElement.src = '/fake-video.mp4'; // ✅ make sure the file exists
         videoElement.loop = true;
         videoElement.muted = true;
         await videoElement.play();

         const stream = videoElement.captureStream();
         setLocalStream(stream);
         if (videoRef.current) videoRef.current.srcObject = stream;
       } else {
         // Real webcam access
         const stream = await navigator.mediaDevices.getUserMedia({
           video: true,
           audio: true,
         });
         setLocalStream(stream);
         if (videoRef.current) videoRef.current.srcObject = stream;
       }
     } catch (err) {
       console.error('Failed to get media', err);
     }
   };

   getMedia();
 }, []);


  // 4. Create peer connection when stream is ready
  useEffect(() => {
    if (localStream && socket) {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { roomId, candidate: event.candidate });
        }
      };

      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      };

      setPeerConnection(pc);
    }
  }, [localStream, socket]);

  // 5. Create and send offer
  const createOffer = async () => {
    if (!peerConnection) return;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { roomId, sdp: offer });
  };

  // 6. Create and send answer
  const createAnswer = async (sdp) => {
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { roomId, sdp: answer });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-4">
      <h2 className="text-2xl">Room ID: {roomId}</h2>

      <div className="flex gap-6">
        <div>
          <p className="text-center">You</p>
          <video ref={videoRef} autoPlay muted playsInline className="rounded shadow w-[320px] h-[240px] bg-gray-800" />
        </div>

        <div>
          <p className="text-center">Other User</p>
          <video ref={remoteVideoRef} autoPlay playsInline className="rounded shadow w-[320px] h-[240px] bg-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default VideoChatRoom;
