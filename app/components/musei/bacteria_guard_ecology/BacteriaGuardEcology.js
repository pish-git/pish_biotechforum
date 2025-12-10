"use client";

import { useState, useEffect } from 'react';
import './bacteria_guard_ecology.css';

import MainScreen from './components/main_screen/MainScreen';



export default function BacteriaGuardEcology({ funForCloseWidget, isMobile }) {
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
		setWelcomeHidden(true);
		
		setTimeout(() => {
			setShouldRenderWelcome(false);
		}, 800);
	};



	return (
		<>
			{shouldRenderWelcome && (
				<MainScreen
					stateButton={buttonStartActive}
					funForButton={handleStartClick}
					hiddenStatus={welcomeHidden}
					isMobile={isMobile}
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