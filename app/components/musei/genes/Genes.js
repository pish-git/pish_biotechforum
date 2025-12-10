"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import './genes.css';

import LevelOne from './components/level_one/LevelOne';
import LevelTwo from './components/level_two/LevelTwo';

import bgImgPng from './img/bg.png';
import bgImgWebp from './img/bg.webp';

export default function Genes({ funForCloseWidget, isMobile }) {
	const [buttonStartActive, setButtonStartActive] = useState(false);
	const [currentLevel, setCurrentLevel] = useState(1);
	const [levelOneHidden, setLevelOneHidden] = useState(false);
	const [levelTwoHidden, setLevelTwoHidden] = useState(true);
	const [shouldRenderLevelOne, setShouldRenderLevelOne] = useState(true);
	const [shouldRenderLevelTwo, setShouldRenderLevelTwo] = useState(false);

	useEffect(() => {
		const buttonTimer = setTimeout(() => {
			setButtonStartActive(true);
		}, 800);

		return () => {
			clearTimeout(buttonTimer);
		};
	}, []);

	const [welcomeHidden, setWelcomeHidden] = useState(false);
	const [shouldRenderWelcome, setShouldRenderWelcome] = useState(true);

	const handleStartClick = () => {
		setTimeout(() => {
			setWelcomeHidden(true);
		}, 50);
		
		setTimeout(() => {
			setShouldRenderWelcome(false);
		}, 800);
	};

	const handleNextLevel = () => {
		// Сначала скрываем первый уровень
		setLevelOneHidden(true);
		
		// После завершения анимации скрытия первого уровня
		setTimeout(() => {
			setShouldRenderLevelOne(false);
			setShouldRenderLevelTwo(true);
			
			// Запускаем анимацию появления второго уровня
			setTimeout(() => {
				setLevelTwoHidden(false);
				setCurrentLevel(2);
			}, 50);
		}, 800); // Время должно совпадать с duration анимации в CSS
	};

	const handleCloseWidget = (close, data) => {
		if (close) {
			funForCloseWidget(true, data);
		} else {
			// При нажатии на кнопку выхода во втором уровне возвращаемся к первому
			setLevelTwoHidden(true);
			
			setTimeout(() => {
				setShouldRenderLevelTwo(false);
				setShouldRenderLevelOne(true);
				
				setTimeout(() => {
					setLevelOneHidden(false);
					setCurrentLevel(1);
				}, 50);
			}, 800);
		}
	};

	return (
		<>
			<div className="block_img_bg">
				<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
					<source srcSet={bgImgWebp.src} type="image/webp" />
					<source srcSet={bgImgPng.src} type="image/jpeg" />
					<Image 
						src={bgImgPng} 
						alt="" 
						fill
						unoptimized={true}
						objectFit='cover'
					/>
				</picture>
			</div>
			
			{shouldRenderLevelOne && (
				<LevelOne
					stateButton={buttonStartActive}
					funForButton={handleStartClick}
					hiddenStatus={welcomeHidden || levelOneHidden}
					onNextLevel={handleNextLevel}
				/>
			)}
			
			{shouldRenderLevelTwo && (
				<LevelTwo 
					funForCloseWidget={handleCloseWidget}
					hiddenStatus={levelTwoHidden}
				/>
			)}

			<button className="button_exit" onClick={() => funForCloseWidget(false, "")}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 73" fill="none">
					<line x1="4.06066" y1="1.93934" x2="74.0607" y2="71.9393" />
					<line x1="1.93934" y1="71.9393" x2="71.9393" y2="1.93934" />
				</svg>
			</button>
		</>
	);
}