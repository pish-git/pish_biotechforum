"use client";

import { useState, useEffect } from 'react';


export const instructionsForTipLeft = {
	initial: {
		text: "Выберите картину для эксперимента",
		icon: "standard",
		type: "standard"
	},
	experimentSelection: {
		text: "Выберите вид эксперимента",
		icon: "standard",
		type: "standard"
	},
	solvent: {
		0: {
			text: ["Картина заражена патогеном. Необходимо спасать предмет искусства! Возьмите образец патогена с картины"],
			icon: "standard",
			type: "standard"
		},
		3: {
			text: ["Растворитель - химическое соединение, способное растворять различные вещества, образуя с ними однородные смеси переменного состава из двух или более компонентов"],
			icon: "standard",
			type: "standard"
		},
		4: {
			text: [
				"Растворитель уничтожил патоген",
				"Похоже, что растворитель эффективен. Попробуйте использовать растворитель на картине"
			],
			icon: "standard",
			type: "standard"
		},
		5: {
			text: ["Хотите ли поместить растворитель на картину? Растворитель может быть губителен для полотна"],
			icon: "question",
			type: "question"
		},
		6: {
			text: ["Вы испортили картину"],
			icon: "fail",
			type: "fail"
		},
		7: {
			text: ["Вы настоящий ценитель искусства, растворитель бы испортил картину"],
			icon: "final",
			type: "final"
		},
	},
	antibiotic: {
		0: {
			text: ["Картина заражена патогеном. Необходимо спасать предмет искусства! Возьмите образец патогена с картины"],
			icon: "standard",
			type: "standard"
		},
		3: {
			text: ["Антибиотики - вещества, обладающие противомикробным действием. Используются в качестве препаратов для лечения инфекций. Могут убивать микроогранизмы или останавливать их размножение"],
			icon: "standard",
			type: "standard"
		},
		4: {
			text: [
				"Антибиотики уничтожил патоген",
				"Поместите антибиотик на картину"
			],
			icon: "standard",
			type: "standard"
		},
		5: {
			text: ["Ура, вы очистили картину от патогена!"],
			icon: "final",
			type: "final"
		},
	},
};

const iconComponents = {
	standard: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 70" fill="none">
			<rect x="0.5" y="5.5" width="64" height="64" rx="14.5" stroke="#556697"/>
			<path d="M25 14C25 14 25 8.21001 25 4.50003C25 4.14652 27.6381 1.00001 28 1.00003C29.3668 1.00011 31.5 1.00003 31.5 1.00003C31.5 1.00003 33.9379 1.00007 35.5 1.00003C35.8341 1.00002 39 4.13057 39 4.50003C39 8.21001 39 14 39 14M25 14C25 14 15 25.1436 15 26C15 27.9527 15 31 15 31M25 14H39M39 14C39 14 49 25.1835 49 26C49 27.9527 49 31 49 31M49 31C49 31 49 48 49 52.5C49 54.9853 46 57 44.5 57C41 57 22 57 19 57C17 57 15 54.5 15 52.5C15 48 15 46.5 15 46.5M49 31H15M15 31V46.5M15 46.5H38" stroke="white" strokeWidth="2"/>
		</svg>
	),
	question: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
			<circle cx="48" cy="48" r="48" fill="url(#paint0_linear_30_8)"/>
			<circle cx="48" cy="48" r="25.5" stroke="white" strokeWidth="3"/>
			<path d="M48 53C48 46.25 59.4099 42.4738 55.5 37C53 33.5 42 33 40.5 40.5" stroke="white" strokeWidth="4"/>
			<circle cx="48" cy="60" r="3" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_30_8" x1="-1.08778e-06" y1="48" x2="96" y2="48" gradientUnits="userSpaceOnUse">
					<stop stopColor="#778D66"/>
					<stop offset="1" stopColor="#5C6D68"/>
				</linearGradient>
			</defs>
		</svg>
	),
	final: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95" fill="none">
			<circle cx="47.5" cy="47.5" r="47.5" fill="url(#paint0_linear_18_4)"/>
			<path d="M48 21C51.9177 21 55.6401 21.8352 59 23.3359V26.665C55.7047 24.9626 51.9649 24 48 24C34.7452 24 24 34.7452 24 48C24 61.2548 34.7452 72 48 72C61.2548 72 72 61.2548 72 48C72 47.665 71.9911 47.3317 71.9775 47H74.9795C74.9916 47.3319 75 47.6652 75 48C75 62.9117 62.9117 75 48 75C33.0883 75 21 62.9117 21 48C21 33.0883 33.0883 21 48 21Z" fill="white"/>
			<path d="M35.5 45L45.5 54.5L74 26.5" stroke="white" strokeWidth="3"/>
			<defs>
				<linearGradient id="paint0_linear_18_4" x1="0" y1="47.5" x2="95" y2="47.5" gradientUnits="userSpaceOnUse">
					<stop stopColor="#2C6A59"/>
					<stop offset="1" stopColor="#424E68"/>
				</linearGradient>
			</defs>
		</svg>
	),
	fail: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
			<circle cx="48" cy="48" r="48" fill="url(#paint0_linear_30_18)"/>
			<circle cx="48" cy="48" r="25.5" stroke="white" strokeWidth="3"/>
			<rect x="37.2269" y="39.069" width="3" height="27.4039" rx="1" transform="rotate(-43.6051 37.2269 39.069)" fill="white"/>
			<rect x="56.4083" y="37.2206" width="3" height="27.4039" rx="1" transform="rotate(45.0912 56.4083 37.2206)" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_30_18" x1="-1.08778e-06" y1="48" x2="96" y2="48" gradientUnits="userSpaceOnUse">
					<stop stopColor="#785C6E"/>
					<stop offset="1" stopColor="#65586F"/>
				</linearGradient>
			</defs>
		</svg>
	),
};



const Tip = ({ experimentState, handlePlaceSolventOnArt }) => {
	const [stageExperiment, currentStep] = experimentState;
	
	const [tipLeftHidden, setTipLeftHidden] = useState(false);
	const [currentTipIndex, setCurrentTipIndex] = useState(0);

	const [text, setText] = useState(instructionsForTipLeft.initial.text);
	const [currentIcon, setCurrentIcon] = useState(iconComponents["standard"]);
	const [tipType, setTipType] = useState("standard");

	const showTipsSequentially = (tips, iconType, type) => {
		setCurrentTipIndex(0);
		setText(tips[0]);
		setCurrentIcon(iconComponents[iconType]);
		setTipType(type);
		
		if (tips.length > 1) {
			const timers = [];
			for (let i = 1; i < tips.length; i++) {
				timers.push(
					setTimeout(() => {
						setCurrentTipIndex(i);
						setText(tips[i]);
					}, i * 1500)
				);
			}
			
			return () => timers.forEach(timer => clearTimeout(timer));
		}
	};

	useEffect(() => {
		if (stageExperiment === "art_select") {
			setText(instructionsForTipLeft.initial.text);

			const iconType = instructionsForTipLeft.initial.icon
			setCurrentIcon(iconComponents[iconType]);

			setTipLeftHidden(false);
			setCurrentTipIndex(0);

			setTipType(instructionsForTipLeft.initial.type);
		} else if (stageExperiment === "experiment_select") {
			setText(instructionsForTipLeft.experimentSelection.text);
			
			const iconType = instructionsForTipLeft.initial.icon
			setCurrentIcon(iconComponents[iconType]);
			
			setTipLeftHidden(false);
			setCurrentTipIndex(0);

			setTipType(instructionsForTipLeft.initial.type);
		} else if (stageExperiment === "solvent") {
			const stepData = instructionsForTipLeft.solvent[currentStep];

			if (stepData && stepData.text.length > 0) {
				showTipsSequentially(stepData.text, stepData.icon, stepData.type);
				setTipLeftHidden(false);
			} else {
				setTipLeftHidden(true);
			}
		} else if (stageExperiment === "antibiotic") {
			const stepData = instructionsForTipLeft.antibiotic[currentStep];

			if (stepData && stepData.text.length > 0) {
				showTipsSequentially(stepData.text, stepData.icon, stepData.type);
				setTipLeftHidden(false);
			} else {
				setTipLeftHidden(true);
			}
		}
	}, [stageExperiment, currentStep]);

	return (
		<div className={`block_tip ${tipLeftHidden ? "_hidden" : ''} ${tipType}`}>
			<div className="tip">
				<span className="icon_tip">{currentIcon}</span>
				<span className="text_tip">{text}</span>
			</div>

			<div className={`buttons ${tipType !== "question" ? "_hidden" : ''}`}>
				<button onClick={() => handlePlaceSolventOnArt(true)}>Да</button>
				<button onClick={() => handlePlaceSolventOnArt(false)}>Нет</button>
			</div>
		</div>
	);
};

export default Tip;