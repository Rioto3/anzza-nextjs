import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Video from 'next-video';

// タイミング設定
const TIMING = {
 VIDEO_LOAD_TIME: 1800,
 FINAL_IMAGE_LOAD_TIME: 2000
};

// トランジション設定
const TRANSITION = {
 INITIAL_IMAGE: 'opacity 3s ease',
 VIDEO: 'opacity 3s ease',
 FINAL_IMAGE: 'opacity 5s ease'
};

// コンポーネントスタイル設定
const STYLES = {
 container: {
   position: 'relative' as const,
   width: '100%',
   height: '100%',
   overflow: 'hidden' as const
 },
 initialImage: {
   position: 'absolute' as const,
   top: 0,
   left: '50%',
   transform: 'translateX(-50%)',
   height: '100%',
   width: 'auto',
   minWidth: '100%',
   zIndex: 2
 },
 videoContainer: {
   position: 'absolute' as const,
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   overflow: 'hidden' as const
 },
 videoInner: {
   width: '100%',
   height: '100%',
   position: 'relative' as const
 },
 video: {
   position: 'absolute' as const,
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'cover' as const
 },
 finalImage: {
   position: 'absolute' as const,
   top: 0,
   left: '50%',
   transform: 'translateX(-50%)',
   height: '100%',
   width: 'auto',
   minWidth: '100%',
   zIndex: 2
 },
 imageStyle: {
   objectFit: 'cover' as const,
   objectPosition: 'center' as const
 }
};

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
     }, TIMING.VIDEO_LOAD_TIME);
     return () => clearTimeout(videoTimer);
   }
 }, [initialImageLoaded]);
 
 const handleVideoEnd = () => {
   setTimeout(() => {
     setShowFinalImage(true);
   }, TIMING.FINAL_IMAGE_LOAD_TIME);
 };
 
 return (
   <div className={className} style={STYLES.container}>
     <div style={{
       ...STYLES.initialImage,
       opacity: showVideo ? 0 : 1,
       transition: TRANSITION.INITIAL_IMAGE,
       zIndex: showVideo ? 0 : 2
     }}>
       <Image
         src={initialImage}
         alt="Initial Hero"
         fill
         priority
         sizes="100vw"
         style={STYLES.imageStyle}
         onLoadingComplete={() => setInitialImageLoaded(true)}
       />
     </div>
     
     <div style={{
       ...STYLES.videoContainer,
       opacity: showVideo ? 1 : 0,
       transition: TRANSITION.VIDEO
     }}>
       <div style={STYLES.videoInner}>
         <Video
           src={fullVideoUrl}
           style={STYLES.video}
           muted
           onEnded={handleVideoEnd}
           autoPlay
           controls={false}
           playsInline
         />
       </div>
     </div>
     
     <div style={{
       ...STYLES.finalImage,
       opacity: showFinalImage ? 1 : 0,
       transition: TRANSITION.FINAL_IMAGE,
       zIndex: showFinalImage ? 2 : 0
     }}>
       <Image
         src={finalImage}
         alt="Final Hero"
         fill
         sizes="100vw"
         style={STYLES.imageStyle}
       />
     </div>
   </div>
 );
}