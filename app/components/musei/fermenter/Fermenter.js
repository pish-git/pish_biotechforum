"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import './fermenter.css';

import MainScreen from './components/main_screen/MainScreen';

import bgImgWebp from './img/bg.webp';
import bgImgPng from './img/bg.png';



export default function Fermenter({ funForCloseWidget, isMobile }) {
	const [buttonStartActive, setButtonStartActive] = useState(false);

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
								
			{shouldRenderWelcome && (
				<MainScreen
					stateButton={buttonStartActive}
					funForButton={handleStartClick}
					hiddenStatus={welcomeHidden}
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