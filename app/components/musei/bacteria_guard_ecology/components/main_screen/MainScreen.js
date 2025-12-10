"use client";

import { useState } from 'react';
import Image from "next/image";

import './main_screen.css';
import './main_screen_media.css';

import UpperPart from '../upper_part/UpperPart';
import DownPart from '../down_part/DownPart';

const CORRECT_ANSWERS = {
	"marine_bacteria": {
		slider1: "dizelnoe-toplivo",
		slider2: "neft"
	},
	"clostridium": {
		slider1: "karton",
		slider2: "bumaga"
	},
	"sphingomonas": {
		slider1: "sadovyi-shlang",
		slider2: "polietilenovyi-paket"
	},
	"flavobacteria": {
		slider1: "kraski-dlya-derevev",
		slider2: "emal-dlya-metalla"
	},
	"pediococcus": {
		slider1: "ovoshnaya-kozhura",
		slider2: "zaplesnevelyi-hleb"
	}
};

const INITIAL_BACTERIA_STATE = {
	"marine_bacteria": false,
	"clostridium": false,
	"sphingomonas": false,
	"flavobacteria": false,
	"pediococcus": false
};

import bgIllustrationImgWebp from '../../img/bg_illustrations/bg.webp';
import bgIllustrationImg from '../../img/bg_illustrations/bg.jpg';

import musorImg1Webp from '../../img/bg_illustrations/musor_1.webp';
import musorImg1 from '../../img/bg_illustrations/musor_1.png';
import musorImg2Webp from '../../img/bg_illustrations/musor_2.webp';
import musorImg2 from '../../img/bg_illustrations/musor_2.png';
import musorImg3Webp from '../../img/bg_illustrations/musor_3.webp';
import musorImg3 from '../../img/bg_illustrations/musor_3.png';
import musorImg4Webp from '../../img/bg_illustrations/musor_4.webp';
import musorImg4 from '../../img/bg_illustrations/musor_4.png';
import musorImg5Webp from '../../img/bg_illustrations/musor_5.webp';
import musorImg5 from '../../img/bg_illustrations/musor_5.png';



export default function MainScreen({ stateButton, funForButton, hiddenStatus, isMobile }) {
	const [selectedBacteria, setSelectedBacteria] = useState(null);
	const [bacteriaVictoryState, setBacteriaVictoryState] = useState(INITIAL_BACTERIA_STATE);

	const handleBacteriaSelect = (bacteriaName) => {
		const bacteriaMap = {
			"Морские бактерии": "marine_bacteria",
			"Клостридия": "clostridium", 
			"Сфингомонады": "sphingomonas",
			"Флавобактерии": "flavobacteria",
			"Педиококки": "pediococcus"
		};
		
		const englishName = bacteriaMap[bacteriaName] || null;
		setSelectedBacteria(englishName);
	};

	const handleRestart = () => {
		setSelectedBacteria(null);
		setBacteriaVictoryState(INITIAL_BACTERIA_STATE);
	};

	const checkAnswer = (slider1Id, slider2Id) => {
		if (!selectedBacteria) return false;
		
		const correctAnswer = CORRECT_ANSWERS[selectedBacteria];
		if (!correctAnswer) return false;
		
		const isCorrect = slider1Id === correctAnswer.slider1 && slider2Id === correctAnswer.slider2;
		
		if (isCorrect) {
			setBacteriaVictoryState(prevState => ({
				...prevState,
				[selectedBacteria]: true
			}));
		}
		
		return isCorrect;
	};

	if (isMobile) {
		return (
			<div className={`main_screen ${hiddenStatus ? "_hidden" : ''}`}>
				<div className="block_bg">
					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={bgIllustrationImgWebp.src} type="image/webp" />
						<source srcSet={bgIllustrationImg.src} type="image/jpeg" />
						<Image 
							className="bg_illustration" 
							src={bgIllustrationImg} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>
					
					<div className="musur_illustrations">
						<img className={`musor_illustration ${bacteriaVictoryState.marine_bacteria ? "_victory" : ""}`} src={musorImg1.src} alt=""></img>
						<img className={`musor_illustration ${bacteriaVictoryState.clostridium ? "_victory" : ""}`} src={musorImg2.src} alt=""></img>
						<img className={`musor_illustration ${bacteriaVictoryState.sphingomonas ? "_victory" : ""}`} src={musorImg3.src} alt=""></img>
						<img className={`musor_illustration ${bacteriaVictoryState.flavobacteria ? "_victory" : ""}`} src={musorImg4.src} alt=""></img>
						<img className={`musor_illustration ${bacteriaVictoryState.pediococcus ? "_victory" : ""}`} src={musorImg5.src} alt=""></img>
					</div>
				</div>

				<div className="choosing_bacterium">
					<div className="mobile_upper_part">
						<UpperPart 
							selectedBacteria={selectedBacteria}
							onBacteriaSelect={handleBacteriaSelect}
							onRestart={handleRestart}
							bacteriaVictoryState={bacteriaVictoryState}
						/>
					</div>

					<div className="mobile_down_part">
						<DownPart 
							selectedBacteria={selectedBacteria} 
							onCheckAnswer={checkAnswer}
							bacteriaVictoryState={bacteriaVictoryState}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`main_screen ${hiddenStatus ? "_hidden" : ''}`}>
			<div className="choosing_bacterium">
				<UpperPart 
					selectedBacteria={selectedBacteria}
					onBacteriaSelect={handleBacteriaSelect}
					onRestart={handleRestart}
					bacteriaVictoryState={bacteriaVictoryState}
				/>

				<DownPart 
					selectedBacteria={selectedBacteria} 
					onCheckAnswer={checkAnswer}
					bacteriaVictoryState={bacteriaVictoryState}
				/>
			</div>

			<div className="block_bg">
				<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
					<source srcSet={bgIllustrationImgWebp.src} type="image/webp" />
					<source srcSet={bgIllustrationImg.src} type="image/jpeg" />
					<Image 
						className="bg_illustration" 
						src={bgIllustrationImg} 
						alt="" 
						fill
						unoptimized={true}
						objectFit='cover'
					/>
				</picture>

				<div className="musur_illustrations">
					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={musorImg1Webp.src} type="image/webp" />
						<source srcSet={musorImg1.src} type="image/jpeg" />
						<Image 
							className={`musor_illustration ${bacteriaVictoryState.marine_bacteria ? "_victory" : ""}`} 
							src={musorImg1} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>

					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={musorImg2Webp.src} type="image/webp" />
						<source srcSet={musorImg2.src} type="image/jpeg" />
						<Image 
							className={`musor_illustration ${bacteriaVictoryState.clostridium ? "_victory" : ""}`} 
							src={musorImg2} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>

					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={musorImg3Webp.src} type="image/webp" />
						<source srcSet={musorImg3.src} type="image/jpeg" />
						<Image 
							className={`musor_illustration ${bacteriaVictoryState.sphingomonas ? "_victory" : ""}`} 
							src={musorImg3} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>

					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={musorImg4Webp.src} type="image/webp" />
						<source srcSet={musorImg4.src} type="image/jpeg" />
						<Image 
							className={`musor_illustration ${bacteriaVictoryState.flavobacteria ? "_victory" : ""}`} 
							src={musorImg4} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>

					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet={musorImg5Webp.src} type="image/webp" />
						<source srcSet={musorImg5.src} type="image/jpeg" />
						<Image 
							className={`musor_illustration ${bacteriaVictoryState.pediococcus ? "_victory" : ""}`} 
							src={musorImg5} 
							alt="" 
							fill
							unoptimized={true}
							objectFit='cover'
						/>
					</picture>
				</div>
			</div>
		</div>
	);
}