"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import './aquabio.css';
import './aquabio_media.css';


const videoList = [
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_1.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_2.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_3.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_4.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_5.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_6.mp4',
	'https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/musei/aquabio/video_7.mp4',
];



export default function Aquabio({ funForCloseWidget, isMobile }) {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [showMobileControls, setShowMobileControls] = useState(false);
	const videoRef = useRef(null);
	const isLastVideo = currentVideoIndex === videoList.length - 1;

	// Автоматическое воспроизведение видео при смене
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	}, [currentVideoIndex]);

	const handleVideoSelect = (index) => {
		setCurrentVideoIndex(index);
		// На мобильных устройствах скрываем кнопки после выбора
		if (isMobile) {
			setShowMobileControls(false);
		}
	};

	const handleNextButtonClick = () => {
		if (isLastVideo) {
			funForCloseWidget(false, "");
		} else {
			setCurrentVideoIndex(prevIndex => prevIndex + 1);
		}
	};

	const toggleMobileControls = () => {
		setShowMobileControls(prev => !prev);
	};

	return (
		<div className="exhibit_video_container">
			<video 
				ref={videoRef} 
				autoPlay 
				muted
				key={currentVideoIndex}
				loop={true}
			>
				<source src={videoList[currentVideoIndex]} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<button className="button_exit" onClick={() => funForCloseWidget(false, "")}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 73" fill="none">
					<line x1="4.06066" y1="1.93934" x2="74.0607" y2="71.9393" />
					<line x1="1.93934" y1="71.9393" x2="71.9393" y2="1.93934" />
				</svg>
			</button>

			<div className="block_controls">
				{isMobile && (
					<div className="open_block" onClick={toggleMobileControls}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="6" r="2" fill="#757585"/>
							<circle cx="12" cy="12" r="2" fill="#757585"/>
							<circle cx="12" cy="18" r="2" fill="#757585"/>
						</svg>
					</div>
				)}

				<div className={`video_buttons ${isMobile && !showMobileControls ? 'mobile_hidden' : ''}`}>
					{videoList.map((_, index) => (
						<button
							key={index}
							className={`video_button ${currentVideoIndex === index ? 'active' : ''}`}
							onClick={() => handleVideoSelect(index)}
						>
							<span>Переключить на видео {index + 1}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}