"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import './challenges_century.css';

import MainScreen from './components/main_screen/MainScreen';
import WelcomeScreen from './components/welcome_screen/WelcomeScreen';
import InfoScreen from './components/info_screen/InfoScreen';

import bgImgWebp from './img/bg.webp';
import bgImg from './img/bg.jpg';



export default function ChallengesCentury({ funForCloseWidget, isMobile }) {
	const [activeYear, setActiveYear] = useState(null);

	const [showMainScreen, setShowMainScreen] = useState(false);
	const [mainScreenHidden, setMainScreenHidden] = useState(true);
	const [buttonStartActive, setButtonStartActive] = useState(false);

	const [showInfoScreen, setShowInfoScreen] = useState(false);
	const [infoScreenHidden, setInfoScreenHidden] = useState(true);


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
		setShowMainScreen(true);
		setMainScreenHidden(true);

		setTimeout(() => {
			setWelcomeHidden(true);
		}, 50);

		setTimeout(() => {
			setMainScreenHidden(false);
		}, 250);
		
		setTimeout(() => {
			setShouldRenderWelcome(false);
		}, 800);
	};

	const handleOpenInfoScreen = () => {
		setShowInfoScreen(true);
		setInfoScreenHidden(true);

		setTimeout(() => {
			setMainScreenHidden(true);
		}, 50);

		setTimeout(() => {
			setInfoScreenHidden(false);
		}, 250);
		
		setTimeout(() => {
			setShowMainScreen(false);
		}, 800);
	};

	const handleCloseInfoScreen = () => {
		setShowMainScreen(true);
		setMainScreenHidden(true);

		setTimeout(() => {
			setInfoScreenHidden(true);
		}, 50);

		setTimeout(() => {
			setMainScreenHidden(false);
		}, 250);
		
		setTimeout(() => {
			setShowInfoScreen(false);
			setActiveYear(null);
		}, 800);
	};



	return (
		<>
			<div className="block_img_bg">
				<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
					<source srcSet={bgImgWebp.src} type="image/webp" />
					<source srcSet={bgImg.src} type="image/jpeg" />
					<Image 
						src={bgImg} 
						alt="" 
						fill
						unoptimized={true}
						objectFit='cover'
					/>
				</picture>
			</div>

			{shouldRenderWelcome && (
				<WelcomeScreen
					stateButton={buttonStartActive}
					funForButton={handleStartClick}
					hiddenStatus={welcomeHidden}
				/>
			)}

			{showMainScreen && (
				<MainScreen 
					isMobile={isMobile} 
					hiddenStatus={mainScreenHidden}
					onOpenInfoScreen={handleOpenInfoScreen}
					activeYear={activeYear}
					setActiveYear={setActiveYear}
				/>
			)}

			{showInfoScreen && (
				<InfoScreen 
					isMobile={isMobile} 
					hiddenStatus={infoScreenHidden}
					onCloseInfoScree={handleCloseInfoScreen}
					activeYear={activeYear}
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