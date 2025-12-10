import React, { useRef, useState, useEffect } from 'react';
import './video_player.css';
import './video_player_media.css';



export default function VideoPlayer({ videoSrc, videoTitle }) {
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showRemainingTime, setShowRemainingTime] = useState(false);
    const videoContainerRef = useRef(null);
    const lastClickTimeRef = useRef(0);
    const clickCountRef = useRef(0);
    const [fullWidthVideo, setFullWidthVideo] = useState(false);
    const [fullScreenVideo, setFullScreenVideo] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showControls, setShowControls] = useState(false);

    // Используем рефы для значений, которые часто меняются
    const volumeRef = useRef(volume);
    const currentTimeRef = useRef(currentTime);
    const durationRef = useRef(duration);
    const inactivityTimeoutRef = useRef(null);

    // Синхронизируем рефы с состоянием
    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);

    useEffect(() => {
        currentTimeRef.current = currentTime;
    }, [currentTime]);

    useEffect(() => {
        durationRef.current = duration;
    }, [duration]);

    // Сброс состояния при изменении видео
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setShowRemainingTime(false);
        setShowControls(false);
        clearTimeout(inactivityTimeoutRef.current);
        
        const videoContainer = videoContainerRef.current;
        if (videoContainer) {
            videoContainer.style.cursor = 'auto';
        }
    }, [videoSrc]);

    // Обработка нажатия клавиш
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Игнорируем, если фокус на элементах ввода
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Показываем контролы и курсор при любом нажатии клавиш
            const videoContainer = videoContainerRef.current;
            if (videoContainer) {
                videoContainer.style.cursor = 'auto';
            }
            showControlsTemporarily();

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (document.fullscreenElement) {
                        exitFullscreen();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    changeVolume(0.05);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    changeVolume(-0.05);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    seekVideo(-5);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    seekVideo(5);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, fullScreenVideo]);

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

    // Единый таймер для скрытия контролов и курсора
    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        if (!videoContainer) return;

        let inactivityTimeout = null;

        const hideControlsAndCursor = () => {
            if (isPlaying) {
                setShowControls(false);
                videoContainer.style.cursor = 'none';
            }
        };

        const showControlsAndCursor = () => {
            setShowControls(true);
            videoContainer.style.cursor = 'auto';
            clearTimeout(inactivityTimeout);
            
            if (isPlaying) {
                inactivityTimeout = setTimeout(hideControlsAndCursor, 3000);
            }
        };

        // Инициализируем скрытие
        if (isPlaying) {
            inactivityTimeout = setTimeout(hideControlsAndCursor, 3000);
        } else {
            // При паузе всегда показываем
            setShowControls(true);
            videoContainer.style.cursor = 'auto';
        }

        videoContainer.addEventListener('mousemove', showControlsAndCursor);
        videoContainer.addEventListener('mouseenter', showControlsAndCursor);
        videoContainer.addEventListener('mouseleave', () => {
            clearTimeout(inactivityTimeout);
            if (isPlaying) {
                setShowControls(false);
                videoContainer.style.cursor = 'none';
            }
        });

        return () => {
            clearTimeout(inactivityTimeout);
            videoContainer.removeEventListener('mousemove', showControlsAndCursor);
            videoContainer.removeEventListener('mouseenter', showControlsAndCursor);
            videoContainer.style.cursor = 'auto';
        };
    }, [isPlaying]);

    // Функция для временного показа контролов и курсора
    const showControlsTemporarily = () => {
        const videoContainer = videoContainerRef.current;
        if (videoContainer) {
            setShowControls(true);
            videoContainer.style.cursor = 'auto';
            clearTimeout(inactivityTimeoutRef.current);
            
            if (isPlaying) {
                inactivityTimeoutRef.current = setTimeout(() => {
                    setShowControls(false);
                    videoContainer.style.cursor = 'none';
                }, 3000);
            }
        }
    };

    // Обработчики движения мыши
    const handleMouseEnter = () => {
        setIsHovered(true);
        showControlsTemporarily();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (isPlaying) {
            setShowControls(false);
            const videoContainer = videoContainerRef.current;
            if (videoContainer) {
                videoContainer.style.cursor = 'none';
            }
        }
        clearTimeout(inactivityTimeoutRef.current);
    };

    const handleMouseMove = () => {
        if (isHovered) {
            showControlsTemporarily();
        }
    };

    // Автоматически показываем контролы при паузе
    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        if (!videoContainer) return;

        if (!isPlaying) {
            setShowControls(true);
            videoContainer.style.cursor = 'auto';
        } else {
            // При воспроизведении запускаем таймер скрытия
            inactivityTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                videoContainer.style.cursor = 'none';
            }, 3000);
        }

        return () => {
            clearTimeout(inactivityTimeoutRef.current);
        };
    }, [isPlaying]);

    // Изменение громкости
    const changeVolume = (delta) => {
        if (videoRef.current) {
            let newVolume = volumeRef.current + delta;
            newVolume = Math.max(0, Math.min(1, newVolume));
            
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            
            if (newVolume > 0) {
                setPrevVolume(newVolume);
            }
        }
    };

    // Перемотка видео
    const seekVideo = (seconds) => {
        if (videoRef.current) {
            let newTime = currentTimeRef.current + seconds;
            newTime = Math.max(0, Math.min(durationRef.current, newTime));
            
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Форматирование времени в MM:SS
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '--:--';
        
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Получение текущего времени для отображения
    const getDisplayTime = () => {
        if (showRemainingTime) {
            const remaining = duration - currentTime;
            return `-${formatTime(remaining)}`;
        }
        return formatTime(currentTime);
    };

    const toggleTimeDisplay = () => {
        setShowRemainingTime(!showRemainingTime);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const handleVideoClick = (e) => {
        // Проверяем, был ли клик по элементам управления
        const isControlClick = e.target.closest('.block_controls') || 
                              e.target.closest('.control_button') ||
                              e.target.closest('.volume_control') ||
                              e.target.closest('.progress_container') ||
                              e.target.closest('.button_fullscreen');
        
        if (isControlClick) {
            return;
        }

        const currentTime = Date.now();
        const timeSinceLastClick = currentTime - lastClickTimeRef.current;

        if (timeSinceLastClick > 300) {
            clickCountRef.current = 0;
        }

        clickCountRef.current++;
        lastClickTimeRef.current = currentTime;

        if (clickCountRef.current === 1) {
            setTimeout(() => {
                if (clickCountRef.current === 1) {
                    togglePlay();
                }
                clickCountRef.current = 0;
            }, 300);
        } else if (clickCountRef.current === 2) {
            toggleFullscreen();
            clickCountRef.current = 0;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setVolume(newVolume);
        if (newVolume > 0) {
            setPrevVolume(newVolume);
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
    };

    const handleTimeUpdate = (e) => {
        const newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const handleProgressBarClick = (e) => {
        if (progressBarRef.current && videoRef.current) {
            const progressBar = progressBarRef.current;
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const progressBarWidth = rect.width;
            const seekPercentage = clickPosition / progressBarWidth;
            const seekTime = seekPercentage * duration;
            
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
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
    };

    const toggleFullWidth = () => {
        setFullWidthVideo(!fullWidthVideo);
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
            className={`video_container ${fullWidthVideo ? "_full_width" : ""}`} 
            ref={videoContainerRef}
            onClick={handleVideoClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
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

            {videoTitle && (
                <div className={`top_title ${shouldShowControls ? "_active" : ""}`}>
                    <p className="title_text">{videoTitle}</p>
                </div>
            )}
            
            <div className={`block_controls ${shouldShowControls ? "_active" : ""}`}>
                <div className="container">
                    <button onClick={togglePlay} className="control_button">
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 36" fill="none">
                                <path d="M33.5 3V33C33.4991 33.7954 33.1827 34.5579 32.6203 35.1203C32.0579 35.6827 31.2954 35.9991 30.5 36H23.75C22.9546 35.9991 22.1921 35.6827 21.6297 35.1203C21.0673 34.5579 20.7509 33.7954 20.75 33V3C20.7509 2.20463 21.0673 1.4421 21.6297 0.879684C22.1921 0.317272 22.9546 0.000909634 23.75 0H30.5C31.2954 0.000909634 32.0579 0.317272 32.6203 0.879684C33.1827 1.4421 33.4991 2.20463 33.5 3V3ZM10.25 0H3.5C2.70463 0.000909634 1.9421 0.317272 1.37968 0.879684C0.817272 1.4421 0.50091 2.20463 0.5 3V33C0.50091 33.7954 0.817272 34.5579 1.37968 35.1203C1.9421 35.6827 2.70463 35.9991 3.5 36H10.25C11.0454 35.9991 11.8079 35.6827 12.3703 35.1203C12.9327 34.5579 13.2491 33.7954 13.25 33V3C13.2491 2.20463 12.9327 1.4421 12.3703 0.879684C11.8079 0.317272 11.0454 0.000909634 10.25 0V0Z" fill="white"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 25" fill="none">
                                <path d="M19.3758 10.9531L3.0413 0.98613C2.76617 0.818147 2.45117 0.726388 2.12873 0.720295C1.80629 0.714202 1.48804 0.793995 1.20674 0.951463C0.925433 1.10893 0.691228 1.33839 0.528221 1.61623C0.365215 1.89406 0.279293 2.21025 0.279297 2.53224V22.468C0.279559 22.7899 0.365646 23.1059 0.528715 23.3836C0.691783 23.6612 0.925954 23.8906 1.20717 24.048C1.48838 24.2054 1.8065 24.2852 2.12884 24.2793C2.45118 24.2733 2.76612 24.1818 3.0413 24.0141L19.3758 14.0471C19.6411 13.8851 19.8604 13.6578 20.0125 13.3869C20.1646 13.116 20.2445 12.8107 20.2445 12.5001C20.2445 12.1896 20.1646 11.8842 20.0125 11.6133C19.8604 11.3425 19.6411 11.1151 19.3758 10.9531Z" fill="white"/>
                            </svg>
                        )}
                    </button>
                    
                    <div className="volume_control">
                        <span onClick={toggleMute}>
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
                                    <path d="M5 5.5V10.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.9121 6.58582C12.0978 6.77153 12.2451 6.99201 12.3457 7.23466C12.4462 7.47731 12.4979 7.73739 12.4979 8.00003C12.4979 8.26267 12.4462 8.52274 12.3457 8.7654C12.2451 9.00805 12.0978 9.22853 11.9121 9.41424" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                                    <path d="M13.6802 4.81799C14.098 5.23586 14.4295 5.73193 14.6557 6.2779C14.8818 6.82386 14.9982 7.40903 14.9982 7.99997C14.9982 8.59092 14.8818 9.17608 14.6557 9.72205C14.4295 10.268 14.098 10.7641 13.6802 11.182" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 10.5H2C1.86739 10.5 1.74021 10.4473 1.64645 10.3536C1.55268 10.2598 1.5 10.1326 1.5 10V6C1.5 5.86739 1.55268 5.74021 1.64645 5.64645C1.74021 5.55268 1.86739 5.5 2 5.5H5L9.5 2V14L5 10.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 5.5V10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.9121 6.58582C12.0978 6.77153 12.2451 6.99201 12.3457 7.23466C12.4462 7.47731 12.4979 7.73739 12.4979 8.00003C12.4979 8.26267 12.4462 8.52274 12.3457 8.7654C12.2451 9.00805 12.0978 9.22853 11.9121 9.41424" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume_slider"
                        />
                    </div>

                    <p className="timer_control" onClick={toggleTimeDisplay}>
                        <span className="current_time">{getDisplayTime()}</span>
                        /
                        <span className="total_time">{formatTime(duration)}</span>
                    </p>
                    
                    <div className="progress_container">
                        <input
                            ref={progressBarRef}
                            type="range"
                            min="0"
                            max={duration}
                            step="0.1"
                            value={currentTime}
                            onChange={handleTimeUpdate}
                            onClick={handleProgressBarClick}
                            className="progress_bar"
                        />
                        <div 
                            className="progress_filled"
                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>

                    {!fullScreenVideo && (
                        <button onClick={toggleFullWidth} className="button_fullwidth">
                            {fullWidthVideo ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 33" fill="none">
                                    <rect x="1.5" y="1.5" width="50" height="30" stroke="white" strokeWidth="3"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 28" fill="none">
                                    <rect x="1.5" y="1.5" width="50" height="25" stroke="white" strokeWidth="3"/>
                                </svg>
                            )}
                        </button>
                    )}
                    
                    <button onClick={toggleFullscreen} className="button_fullscreen">
                        {fullScreenVideo ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 52" fill="none">
                                <line x1="57.0607" y1="1.06066" x2="38.5539" y2="19.5674" stroke="white" strokeWidth="3"/>
                                <line x1="38.2466" y1="20.7534" x2="38.2466" y2="4.75342" stroke="white" strokeWidth="3"/>
                                <line x1="52.7466" y1="20.2534" x2="36.7466" y2="20.2534" stroke="white" strokeWidth="3"/>
                                <line x1="1.93934" y1="50.6928" x2="20.4461" y2="32.186" stroke="white" strokeWidth="3"/>
                                <line x1="20.7534" y1="31" x2="20.7534" y2="47" stroke="white" strokeWidth="3"/>
                                <line x1="6.25342" y1="31.5" x2="22.2534" y2="31.5" stroke="white" strokeWidth="3"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 54" fill="none">
                                <line x1="32.6859" y1="20.6928" x2="51.1927" y2="2.186" stroke="white" strokeWidth="3"/>
                                <line x1="51.5" y1="1" x2="51.5" y2="17" stroke="white" strokeWidth="3"/>
                                <line x1="37" y1="1.5" x2="53" y2="1.5" stroke="white" strokeWidth="3"/>
                                <line x1="20.3141" y1="33.0607" x2="1.80732" y2="51.5674" stroke="white" strokeWidth="3"/>
                                <line x1="1.5" y1="52.7534" x2="1.5" y2="36.7534" stroke="white" strokeWidth="3"/>
                                <line x1="16" y1="52.2534" y2="52.2534" stroke="white" strokeWidth="3"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}