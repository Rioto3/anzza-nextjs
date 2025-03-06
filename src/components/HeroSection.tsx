import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Video from 'next-video';

const VIDEO_LOAD_TIME = 1800;
const FINAL_IMAGE_LOAD_TIME = 2000;

interface HeroSectionProps {
  initialImage: string;
  videoSrc: string;
  finalImage: string;
  className?: string;
}

export function HeroSection({
  initialImage,
  videoSrc,
  finalImage,
  className
}: HeroSectionProps) {
  const [initialImageLoaded, setInitialImageLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const fullVideoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${videoSrc}.mp4`;
  
  useEffect(() => {
    if (initialImageLoaded) {
      const videoTimer = setTimeout(() => {
        setShowVideo(true);
      }, VIDEO_LOAD_TIME);
      return () => clearTimeout(videoTimer);
    }
  }, [initialImageLoaded]);
  
  const handleVideoEnd = () => {
    setTimeout(() => {
      setShowFinalImage(true);
    }, FINAL_IMAGE_LOAD_TIME);
  };
  
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        width: 'auto',
        minWidth: '100%',
        opacity: showVideo ? 0 : 1,
        transition: 'opacity 3s ease',
        zIndex: showVideo ? 0 : 2
      }}>
        <Image
          src={initialImage}
          alt="Initial Hero"
          fill
          priority
          sizes="100vw"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center' 
          }}
          onLoadingComplete={() => setInitialImageLoaded(true)}
        />
      </div>




      <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: showVideo ? 1 : 0,
  transition: 'opacity 3s ease',
  overflow: 'hidden'
}}>
  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <style jsx>{`
      .next-video-container {
        aspect-ratio: unset !important;
      }
      
      [data-next-video] {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
    `}</style>
    <Video
      src={fullVideoUrl}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      muted
      onEnded={handleVideoEnd}
      autoPlay
      controls={false}
      playsInline
    />
  </div>
</div>





      
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        width: 'auto',
        minWidth: '100%',
        opacity: showFinalImage ? 1 : 0,
        transition: 'opacity 5s ease',
        zIndex: showFinalImage ? 2 : 0
      }}>
        <Image
          src={finalImage}
          alt="Final Hero"
          fill
          sizes="100vw"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>
  );
}