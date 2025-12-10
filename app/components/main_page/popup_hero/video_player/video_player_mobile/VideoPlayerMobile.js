// VideoPlayerMobile.js
import React, { useRef, useState, useEffect } from 'react';
import './video_player_mobile.css';
import './video_player_mobile_media.css';



export default function VideoPlayerMobile({ videoSrc, videoTitle }) {
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoContainerRef = useRef(null);
    const [fullScreenVideo, setFullScreenVideo] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const inactivityTimeoutRef = useRef(null);

    // Сброс состояния при изменении видео
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setShowControls(false);
        clearTimeout(inactivityTimeoutRef.current);
    }, [videoSrc]);

    // Слушатель изменения полноэкранного режима
    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullScreenVideo(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Автоматическое скрытие контролов через 2 секунды
    useEffect(() => {
        const hideControls = () => {
            if (isPlaying && showControls) {
                setShowControls(false);
            }
        };

        if (isPlaying && showControls) {
            clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(hideControls, 2000);
        }

        return () => {
            clearTimeout(inactivityTimeoutRef.current);
        };
    }, [isPlaying, showControls]);

    // При паузе всегда показываем контролы
    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            clearTimeout(inactivityTimeoutRef.current);
        }
    }, [isPlaying]);

    // Функция для сброса таймера скрытия интерфейса
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeoutRef.current);
        if (isPlaying && showControls) {
            inactivityTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2000);
        }
    };

    // Перемотка видео
    const seekVideo = (seconds) => {
        if (videoRef.current) {
            let newTime = currentTime + seconds;
            newTime = Math.max(0, Math.min(duration, newTime));
            
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            
            // Сброс таймера скрытия интерфейса
            resetInactivityTimer();
        }
    };

    // Форматирование времени в MM:SS
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '--:--';
        
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
        
        // Сброс таймера скрытия интерфейса
        resetInactivityTimer();
    };

    const handleVideoClick = (e) => {
        // Проверяем, был ли клик по элементам управления
        const isControlClick = e.target.closest('.mobile_center_controls') || 
                              e.target.closest('.mobile_bottom_controls') ||
                              e.target.closest('.mobile_top_title') ||
                              e.target.closest('.control_button') ||
                              e.target.closest('.rewind_button') ||
                              e.target.closest('.mute_button') ||
                              e.target.closest('.progress_container') ||
                              e.target.closest('.fullscreen_button');
        
        if (isControlClick) {
            // Сбрасываем таймер скрытия при клике на элементы управления
            resetInactivityTimer();
            return;
        }

        // Переключаем видимость контролов при клике на видео
        setShowControls(prev => !prev);
        
        // Сбрасываем таймер при открытии контролов
        if (!showControls && isPlaying) {
            resetInactivityTimer();
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (volume > 0) {
                setPrevVolume(volume);
                videoRef.current.volume = 0;
                setVolume(0);
            } else {
                videoRef.current.volume = prevVolume;
                setVolume(prevVolume);
            }
        }
        
        // Сброс таймера скрытия интерфейса
        resetInactivityTimer();
    };

    const handleTimeUpdate = (e) => {
        const newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
        
        // Сброс таймера скрытия интерфейса
        resetInactivityTimer();
    };

    const handleProgressBarClick = (e) => {
        console.log(progressBarRef.current)
        console.log(videoRef.current)
        if (progressBarRef.current && videoRef.current) {
            const progressBar = progressBarRef.current;
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const progressBarWidth = rect.width;
            const seekPercentage = clickPosition / progressBarWidth;
            const seekTime = seekPercentage * duration;
            
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
            
            // Сброс таймера скрытия интерфейса
            resetInactivityTimer();
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setFullScreenVideo(false);
        }
    };

    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;

        if (document.fullscreenElement) {
            exitFullscreen();
        } else {
            videoContainerRef.current.requestFullscreen();
            setFullScreenVideo(true);
        }
        
        // Сброс таймера скрытия интерфейса
        resetInactivityTimer();
    };

    const handleVideoTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleVolumeChangeEvent = () => {
        if (videoRef.current) {
            setVolume(videoRef.current.volume);
        }
    };

    // Определяем, нужно ли показывать контролы
    const shouldShowControls = showControls || !isPlaying;

    return (
        <div 
            className={`video_container_mobile`} 
            ref={videoContainerRef}
            onClick={handleVideoClick}
        >
            <video
                ref={videoRef}
                className="video-player"
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={handlePlay}
                onPause={handlePause}
                onVolumeChange={handleVolumeChangeEvent}
                key={videoSrc}
            >
                {videoSrc && (
                    <source 
                        src={videoSrc} 
                        type="video/mp4" 
                    />
                )}
                Your browser does not support the video tag.
            </video>
            
            {/* Заголовок видео */}
            {videoTitle && (
                <div className={`mobile_top_title ${shouldShowControls ? "_active" : ""}`}>
                    <p className="title_text">{videoTitle}</p>
                </div>
            )}
            
            {/* Центральные кнопки управления */}
            <div className={`mobile_center_controls ${shouldShowControls ? "_active" : ""}`}>
                <button className="rewind_button" onClick={(e) => { e.stopPropagation(); seekVideo(-5); }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="82" viewBox="0 0 78 82" fill="none">
                        <path d="M38.9307 4.12854C60.4334 4.12880 77.8651 21.5607 77.8652 43.0641C77.8652 64.5675 60.4335 81.9994 38.9307 81.9996C17.9951 81.9996 0.920752 65.4754 0.0341797 44.7574H6.03809C6.9194 62.1605 21.3094 75.9996 38.9307 75.9996C57.1196 75.9994 71.8652 61.254 71.8652 43.0641C71.8651 24.8743 57.1196 10.1288 38.9307 10.1285C29.2012 10.1286 20.4578 14.3488 14.4287 21.0573H6.80957C13.8265 10.8347 25.5949 4.12859 38.9307 4.12854Z" fill="white"/>
                        <rect x="6" y="20" width="25" height="6" rx="3" fill="white"/>
                        <rect x="6" y="25" width="25" height="6" rx="3" transform="rotate(-90 6 25)" fill="white"/>
                        <path d="M29.7401 42.3665V46.9062H18.294V42.3665H29.7401ZM43.3262 57.3381C41.5231 57.3381 39.9213 57.0121 38.5208 56.3601C37.1202 55.7081 36.0134 54.8106 35.2005 53.6676C34.3955 52.5246 33.977 51.2126 33.9448 49.7315H39.7402C39.7885 50.6411 40.1588 51.3736 40.851 51.929C41.5433 52.4763 42.3683 52.75 43.3262 52.75C44.0748 52.75 44.7388 52.585 45.3184 52.255C45.8979 51.925 46.3527 51.4621 46.6827 50.8665C47.0127 50.2628 47.1737 49.5705 47.1657 48.7898C47.1737 47.9929 47.0087 47.2966 46.6706 46.701C46.3406 46.1054 45.8818 45.6425 45.2942 45.3125C44.7147 44.9744 44.0466 44.8054 43.29 44.8054C42.5736 44.7973 41.8934 44.9543 41.2495 45.2763C40.6136 45.5982 40.1306 46.0369 39.8006 46.5923L34.5243 45.6023L35.5989 32.2727H51.464V37.0902H40.513L39.9455 42.9219H40.0904C40.5009 42.2377 41.1609 41.6742 42.0705 41.2315C42.9881 40.7808 44.0305 40.5554 45.1976 40.5554C46.6787 40.5554 47.9988 40.9015 49.1578 41.5938C50.325 42.2779 51.2426 43.2277 51.9107 44.4432C52.5868 45.6586 52.9249 47.0511 52.9249 48.6207C52.9249 50.3191 52.5224 51.8243 51.7175 53.1364C50.9206 54.4484 49.8018 55.4787 48.361 56.2273C46.9282 56.9678 45.2499 57.3381 43.3262 57.3381Z" fill="white"/>
                    </svg>
                </button>
                
                <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="control_button">
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" fill="none">
                            <rect x="6" y="1" width="20" height="68" rx="2" fill="white"/>
                            <rect x="44" y="1" width="20" height="68" rx="2" fill="white"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" fill="none" style={{marginLeft: 5 + "px"}}>
                            <path d="M62.7011 32.4261C64.6463 33.5907 64.6463 36.4093 62.7011 37.5739L10.7911 68.6542C8.79148 69.8514 6.25 68.4109 6.25 66.0802L6.25 3.91975C6.25 1.58912 8.79147 0.148598 10.7911 1.34584L62.7011 32.4261Z" fill="white"/>
                        </svg>
                    )}
                </button>

                <button className="rewind_button" onClick={(e) => { e.stopPropagation(); seekVideo(5); }} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 82" fill="none">
                        <path d="M38.9346 4.12854C17.4318 4.12880 0.000107685 21.5607 0 43.0641C0 64.5675 17.4317 81.9994 38.9346 81.9996C59.8702 81.9996 76.9445 65.4754 77.8311 44.7574H71.8271C70.9458 62.1605 56.5558 75.9996 38.9346 75.9996C20.7456 75.9994 6 61.254 6 43.0641C6.00011 24.8743 20.7457 10.1288 38.9346 10.1285C48.664 10.1286 57.4074 14.3488 63.4365 21.0573H71.0557C64.0387 10.8347 52.2703 4.12859 38.9346 4.12854Z" fill="white"/>
                        <rect width="25" height="6" rx="3" transform="matrix(-1 0 0 1 71.8652 20)" fill="white"/>
                        <rect width="25" height="6" rx="3" transform="matrix(0 -1 -1 0 71.8652 25)" fill="white"/>
                        <path d="M23.2365 53.4261V35.9432H28.1023V53.4261H23.2365ZM16.9219 47.1236V42.2457H34.4048V47.1236H16.9219ZM48.6309 57.3381C46.8278 57.3381 45.226 57.0121 43.8255 56.3601C42.4249 55.7081 41.3181 54.8106 40.5051 53.6676C39.7002 52.5246 39.2817 51.2126 39.2495 49.7315H45.0449C45.0932 50.6411 45.4635 51.3736 46.1557 51.929C46.848 52.4763 47.673 52.75 48.6309 52.75C49.3794 52.75 50.0435 52.585 50.623 52.255C51.2026 51.925 51.6574 51.4621 51.9874 50.8665C52.3174 50.2628 52.4784 49.5705 52.4703 48.7898C52.4784 47.9929 52.3134 47.2966 51.9753 46.701C51.6453 46.1054 51.1865 45.6425 50.5989 45.3125C50.0194 44.9744 49.3513 44.8054 48.5946 44.8054C47.8783 44.7973 47.1981 44.9543 46.5542 45.2763C45.9183 45.5982 45.4353 46.0369 45.1053 46.5923L39.829 45.6023L40.9036 32.2727H56.7686V37.0902H45.8176L45.2502 42.9219H45.3951C45.8056 42.2377 46.4656 41.6742 47.3752 41.2315C48.2928 40.7808 49.3352 40.5554 50.5023 40.5554C51.9834 40.5554 53.3034 40.9015 54.4625 41.5938C55.6297 42.2779 56.5473 43.2277 57.2154 44.4432C57.8915 45.6586 58.2296 47.0511 58.2296 48.6207C58.2296 50.3191 57.8271 51.8243 57.0222 53.1364C56.2253 54.4484 55.1065 55.4787 53.6657 56.2273C52.2329 56.9678 50.5546 57.3381 48.6309 57.3381Z" fill="white"/>
                    </svg>
                </button>
            </div>

            {/* Нижние контролы */}
            <div className={`mobile_bottom_controls ${shouldShowControls ? "_active" : ""}`}>
                <span onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="mute_button">
                    {volume === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M13.6807 4.81873C14.5246 5.66264 14.9987 6.80723 14.9987 8.00071C14.9987 9.19418 14.5246 10.3388 13.6807 11.1827" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.99951 5.50073V10.50073" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.9126 6.58649C12.2877 6.96156 12.4984 6.47027 12.4984 8.0007C12.4984 8.53113 12.2877 9.03984 11.9126 9.41491" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 2.5L13 13.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.5 9.65V14.0007L5 10.5007H2C1.86739 10.5007 1.74021 10.4481 1.64645 10.3543C1.55268 10.2605 1.5 10.1333 1.5 10.0007V6.00073C1.5 5.86812 1.55268 5.74095 1.64645 5.64718C1.74021 5.55341 1.86739 5.50073 2 5.50073H5L5.42642 5.16907" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.00977 3.93754L9.50002 2.00073V6.6768" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : volume < 0.5 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M5 10.5H2C1.86739 10.5 1.74021 10.4473 1.64645 10.3536C1.55268 10.2598 1.5 10.1326 1.5 10V6C1.5 5.86739 1.55268 5.74021 1.64645 5.64645C1.74021 5.55268 1.86739 5.5 2 5.5H5L9.5 2V14L5 10.5Z" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.9126 6.58649C12.2877 6.96156 12.4984 6.47027 12.4984 8.0007C12.4984 8.53113 12.2877 9.03984 11.9126 9.41491" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M5 10.5H2C1.86739 10.5 1.74021 10.4473 1.64645 10.3536C1.55268 10.2598 1.5 10.1326 1.5 10V6C1.5 5.86739 1.55268 5.74021 1.64645 5.64645C1.74021 5.55268 1.86739 5.5 2 5.5H5L9.5 2V14L5 10.5Z" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.6807 4.81873C14.5246 5.66264 14.9987 6.80723 14.9987 8.00071C14.9987 9.19418 14.5246 10.3388 13.6807 11.1827" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.9126 6.58649C12.2877 6.96156 12.4984 6.47027 12.4984 8.0007C12.4984 8.53113 12.2877 9.03984 11.9126 9.41491" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </span>

                <span className="timer_control">{formatTime(currentTime)}</span>

                <div className="progress_container" onClick={handleProgressBarClick} ref={progressBarRef}>
                    <div className="progress_filled" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                    <input
                        type="range"
                        className="progress_bar"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleTimeUpdate}
                    />
                </div>

                <span className="timer_control">{formatTime(duration)}</span>

                <span onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="fullscreen_button">
                    {fullScreenVideo ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M6.5 9.5L2 14M2 14V10.5M2 14H5.5M9.5 6.5L14 2M14 2V5.5M14 2H10.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 9.5L2 13M2 13V10M2 13H5M10.5 6.5L14 3M14 3V6M14 3H11" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </span>
            </div>
        </div>
    );
}