import React, { useRef, useState, useEffect } from 'react';

const CameraMicControl = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  // Start camera & mic
  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setIsStreaming(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  // Stop camera & mic
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setIsStreaming(false);
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopStream(); // Cleanup on unmount
    };
  }, [stream]);

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md rounded-lg shadow-md"
      ></video>
      <div className="flex space-x-4">
        {!isStreaming ? (
          <button
            onClick={startStream}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Start Camera + Mic
          </button>
        ) : (
          <button
            onClick={stopStream}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Stop Stream
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraMicControl;
