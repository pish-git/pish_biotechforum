"use client"

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";



const VideoPlayer = ({ 
  src, 
  srcImg1,
  srcImg2,
  onReady, 
  className = '',
  preload = 'auto',
  autoplay = true,
  isActive = false
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      onReady && onReady(video);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    // Устанавливаем правильный атрибут preload
    video.preload = preload;
    
    if (isActive && autoplay) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isActive, autoplay, onReady, preload]);

  return (
    <div className={`video-container ${className}`}>
      <div className="block_img">
        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
          <source srcSet={srcImg1} type="image/webp" />
          <source srcSet={srcImg2} type="image/jpeg" />
          <Image 
            src={srcImg2} 
            alt="Интерактивный музей 1 этап" 
            fill
            unoptimized={true}
            objectFit='cover'
          />
        </picture>
      </div>

      <video
        ref={videoRef}
        src={src}
        preload={preload}
        muted
        playsInline
        loop
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

export default VideoPlayer;