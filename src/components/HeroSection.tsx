import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const video_load_time = 1800;
const final_image_load_time = 5000;

interface HeroSectionProps {
  initialImage: string;
  videoSrc: string;
  finalImage: string;
  className?: string;
}



export function HeroSection({ initialImage, videoSrc, finalImage, className }: HeroSectionProps) {
  const [initialImageLoaded, setInitialImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [finalImageLoaded, setFinalImageLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    if (initialImageLoaded && videoRef.current) {
      videoRef.current.load();
    }
  }, [initialImageLoaded]);

  useEffect(() => {
    if (initialImageLoaded && videoLoaded) {
      const videoTimer = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play().catch(err => console.error('動画再生エラー:', err));
        }
      }, video_load_time);

      return () => clearTimeout(videoTimer);
    }
  }, [initialImageLoaded, videoLoaded]);

  const handleVideoEnd = () => {
    if (finalImageLoaded) {
      setShowFinalImage(true);
    } else {
      const checkLoaded = setInterval(() => {
        if (finalImageLoaded) {
          setShowFinalImage(true);
          clearInterval(checkLoaded);
        }
      },final_image_load_time);
      
      setTimeout(() => clearInterval(checkLoaded), video_load_time);
    }
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: showVideo ? 0 : 1,
          transition: 'opacity 3s ease',
          zIndex: showVideo ? 0 : 2
        }}
      >
        <Image 
          src={initialImage} 
          alt="Initial Hero" 
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          onLoadingComplete={() => setInitialImageLoaded(true)}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: showVideo ? 1 : 0,
          transition: 'opacity 3s ease',
          zIndex: 1
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onEnded={handleVideoEnd}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: showFinalImage ? 1 : 0,
          transition: 'opacity 3s ease',
          zIndex: showFinalImage ? 2 : 0
        }}
      >
        <Image 
          src={finalImage} 
          alt="Final Hero" 
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          onLoadingComplete={() => setFinalImageLoaded(true)}
        />
      </div>
    </div>
  );
}