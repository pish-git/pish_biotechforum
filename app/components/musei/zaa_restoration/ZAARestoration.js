"use client";

import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import './zaa_restoration.css';


import MainScreen from './components/main_screen/MainScreen';
import WelcomeScreen from './components/welcome_screen/WelcomeScreen';



export default function ZAARestoration({ funForCloseWidget, isMobile }) {
	const [showMainScreen, setShowMainScreen] = useState(false);
	const [buttonStartActive, setButtonStartActive] = useState(false);

	useEffect(() => {
		const mainScreenTimer = setTimeout(() => {
			setShowMainScreen(true);
		}, 500);

		const buttonTimer = setTimeout(() => {
			setButtonStartActive(true);
		}, 800);

		return () => {
			clearTimeout(mainScreenTimer);
			clearTimeout(buttonTimer);
		};
	}, []);


	const [welcomeHidden, setWelcomeHidden] = useState(false);
	const [shouldRenderWelcome, setShouldRenderWelcome] = useState(true);

	const handleStartClick = () => {
		setWelcomeHidden(true);

		setTimeout(() => {
			setShouldRenderWelcome(false);
		}, 1100);
	};



	return (
		<>
			{shouldRenderWelcome && (
				<WelcomeScreen
					stateButton={buttonStartActive}
					funForButton={handleStartClick}
					hiddenStatus={welcomeHidden}
				/>
			)}

			{showMainScreen && <MainScreen isMobile={isMobile} />}

			<button className="button_exit" onClick={() => funForCloseWidget(false, "")}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 73" fill="none">
					<line x1="4.06066" y1="1.93934" x2="74.0607" y2="71.9393" />
					<line x1="1.93934" y1="71.9393" x2="71.9393" y2="1.93934" />
				</svg>
			</button>
		</>
	);
};