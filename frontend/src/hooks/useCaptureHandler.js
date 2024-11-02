import { useRef, useCallback, useEffect, useState } from 'react';
import experimentService from '../services/experimentService';

export const useCaptureHandler = (sessionId, trialNumber) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const initializeCapture = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          frameRate: 30
        } 
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error('Failed to initialize capture:', error);
    }
  }, []);

  const captureFrame = useCallback(async () => {
    if (!videoRef.current || !stream) return null;
    
    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const captureData = canvas.toDataURL('image/jpeg');
    setIsCapturing(false);
    
    return captureData;
  }, [stream]);

  useEffect(() => {
    initializeCapture();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initializeCapture, stream]);

  return { 
    videoRef, 
    stream, 
    isCapturing,
    captureFrame 
  };
  
};

export default useCaptureHandler;

