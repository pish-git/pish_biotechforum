"use client";

import { useState, useEffect } from 'react';

import './upper_part.css';
import './upper_part_media.css';



export default function UpperPart({ selectedBacteria, onBacteriaSelect, onRestart, bacteriaVictoryState }) {
	const [currentHint, setCurrentHint] = useState({ 
		id: 0, 
		content: (
			<>
				<span className="bulb"></span>
				<div className="arrow">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 24" fill="none">
						<path d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9393L92.5147 1.3934C91.9289 0.807612 90.9792 0.807612 90.3934 1.3934C89.8076 1.97918 89.8076 2.92893 90.3934 3.51472L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM0 12V13.5H101V12V10.5H0V12Z" fill="white"/>
					</svg>
				</div>
				<p>Выберите бактерию</p>
			</>
		),
		className: "",
		show: true 
	});
	const [nextHint, setNextHint] = useState(null);

	useEffect(() => {
		if (selectedBacteria !== null) {
			// Анимация для подсказок
			const newHintId = currentHint.id + 1;
			const hintData = getHintContent(selectedBacteria);
			
			setNextHint({ 
				id: newHintId, 
				content: hintData.content,
				className: hintData.className,
				show: false 
			});
			
			setTimeout(() => {
				setNextHint(prev => prev ? { ...prev, show: true } : null);
			}, 50);
			
			setTimeout(() => {
				setCurrentHint({ 
					id: newHintId, 
					content: hintData.content,
					className: hintData.className,
					show: true 
				});
				setNextHint(null);
			}, 550);
		}
	}, [selectedBacteria]);

	useEffect(() => {
		if (selectedBacteria === null && currentHint.id > 0) {
			// Анимация для подсказок
			const newHintId = currentHint.id + 1;
			const hintData = getHintContent(null);
			
			setNextHint({ 
				id: newHintId, 
				content: hintData.content,
				className: hintData.className,
				show: false 
			});
			
			setTimeout(() => {
				setNextHint(prev => prev ? { ...prev, show: true } : null);
			}, 50);
			
			setTimeout(() => {
				setCurrentHint({ 
					id: newHintId, 
					content: hintData.content,
					className: hintData.className,
					show: true 
				});
				setNextHint(null);
			}, 550);
		}
	}, [selectedBacteria]);

	const getHintContent = (bacteria) => {
		if (!bacteria) {
			return {
				content: (
					<>
						<span className="bulb"></span>
						<div className="arrow">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 24" fill="none">
								<path d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9393L92.5147 1.3934C91.9289 0.807612 90.9792 0.807612 90.3934 1.3934C89.8076 1.97918 89.8076 2.92893 90.3934 3.51472L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM0 12V13.5H101V12V10.5H0V12Z" fill="white"/>
							</svg>
						</div>
						<p>Выберите бактерию</p>
					</>
				),
				className: ""
			};
		}

		const hintVariants = {
			marine_bacteria: {
				content: (
					<>
						<span className="icon"></span>
						<p>Морские бактерии могут <br/> питаться нефтепродуктами</p>
					</>
				),
				className: "about_bacteria"
			},
			clostridium: {
				content: (
					<>
						<span className="icon"></span>
						<p>Клостридии могут <br/> перерабатывать целлюлозу</p>
					</>
				),
				className: "about_bacteria"
			},
			sphingomonas: {
				content: (
					<>
						<span className="icon"></span>
						<p>Бактерии сфингомонады <br/> питаются полиэтиленом</p>
					</>
				),
				className: "about_bacteria"
			},
			flavobacteria: {
				content: (
					<>
						<span className="icon"></span>
						<p>Флавобактерии могут перерабатывать лакокрасочные материалы</p>
					</>
				),
				className: "about_bacteria"
			},
			pediococcus: {
				content: (
					<>
						<span className="icon"></span>
						<p>Педиококки могут <br/> разлагать пищевые отходы</p>
					</>
				),
				className: "about_bacteria"
			}
		};

		return hintVariants[bacteria] || hintVariants.marine_bacteria;
	};

	return (
		<div className={`upper_part ${selectedBacteria ? "_active" : ''}`}>
			<div 
				key={currentHint.id} 
				className={`block_hint ${currentHint.className} ${nextHint ? '_hidden' : ''}`}
			>
				{currentHint.content}
			</div>

			{nextHint && (
				<div 
					key={nextHint.id} 
					className={`block_hint ${nextHint.className} ${nextHint.show ? '' : '_hide'}`}
				>
					{nextHint.content}
				</div>
			)}

			<div className="buttons_choose">
				<button 
					className={`${selectedBacteria === "marine_bacteria" ? "_active" : ""} ${
						bacteriaVictoryState.marine_bacteria ? "_victory" : ""
					}`}
					onClick={() => onBacteriaSelect("Морские бактерии")}
				>
					<span className="icon_victory">
						<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
							<circle cx="13.5" cy="13.5" r="13.5" fill="#B6D14E"/>
							<path d="M13.1196 5.17082C13.2393 4.80229 13.7607 4.8023 13.8804 5.17082L15.5431 10.2879C15.5966 10.4528 15.7502 10.5643 15.9235 10.5643H21.304C21.6915 10.5643 21.8526 11.0602 21.5391 11.2879L17.1862 14.4505C17.046 14.5524 16.9873 14.7329 17.0409 14.8977L18.7035 20.0148C18.8233 20.3834 18.4015 20.6898 18.088 20.4621L13.7351 17.2995C13.5949 17.1976 13.4051 17.1976 13.2649 17.2995L8.912 20.4621C8.59851 20.6898 8.17672 20.3834 8.29646 20.0148L9.95912 14.8977C10.0127 14.7329 9.954 14.5524 9.81381 14.4505L5.46092 11.2879C5.14744 11.0602 5.30855 10.5643 5.69604 10.5643H11.0765C11.2498 10.5643 11.4034 10.4528 11.4569 10.2879L13.1196 5.17082Z" fill="white"/>
						</svg>
					</span>

					<div className="button_icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 73" fill="none">
							<path d="M35.5 71.5H21C19.001 71.5 12.9052 68.21 9 64.5C5.09476 60.79 1 54 1 52.5V47.5L3 43V39L1 32.5C1 32.5 1.00062 23.5 1 18C0.99983 16.5 5.59476 11.8195 9.5 8.5C13.4052 5.18054 19 0.999892 21 1C26.5 1.0003 29 0.999993 34.5 1C37.5 1 41.8667 3.84588 46 7C50.0745 10.1093 55.5 16 55.5 17V22.5L53.5 25.5V29.5L55 33V51C55 53 52.3076 59.4971 48.5 63.5C44.6924 67.5029 37.501 71.5 35.5 71.5Z" stroke="white" strokeWidth="2"/>
							<path d="M10.001 50C10.001 50 19.501 59.5 21.501 59.5C26.501 59.5 30.3384 59.5 36.001 59.5C37.501 59.5 46.001 49.5 46.001 49.5" stroke="white" strokeWidth="2"/>
							<path d="M12.501 23.5C12.501 23.5 14.813 21.7293 17.001 21M17.001 21C17.001 24.1242 17.001 26.5 17.001 29.5C17.001 30.5 21.501 41.5 23.501 41.5C25.501 41.5 30.001 41.5 32.501 41.5C36.2724 41.5 39.501 30 39.501 29C39.501 26 39.501 23.9289 39.501 21M17.001 21C20.001 20 21.3471 19.7308 24.501 19.5M39.501 21C41.501 21.8 44.501 23 44.501 23M39.501 21C37.001 20 35.501 19.5 33.001 19.5M24.501 19.5C27.8204 19.5 29.6815 19.5 33.001 19.5M24.501 19.5C24.501 23.7958 24.501 30.5 24.501 30.5C24.501 30.5 24.3979 35 26.501 35C28.001 35 29.001 35 30.501 35C32.7781 35 33.001 30.5 33.001 30.5C33.001 30.5 33.001 23.7958 33.001 19.5" stroke="white" strokeWidth="2"/>
						</svg>
					</div>

					<p className="button_text">Морские <br/> бактерии</p>
				</button>

				<button 
					className={`${selectedBacteria === "clostridium" ? "_active" : ""} ${
						bacteriaVictoryState.clostridium ? "_victory" : ""
					}`}
					onClick={() => onBacteriaSelect("Клостридия")}
				>
					<span className="icon_victory">
						<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
							<circle cx="13.5" cy="13.5" r="13.5" fill="#B6D14E"/>
							<path d="M13.1196 5.17082C13.2393 4.80229 13.7607 4.8023 13.8804 5.17082L15.5431 10.2879C15.5966 10.4528 15.7502 10.5643 15.9235 10.5643H21.304C21.6915 10.5643 21.8526 11.0602 21.5391 11.2879L17.1862 14.4505C17.046 14.5524 16.9873 14.7329 17.0409 14.8977L18.7035 20.0148C18.8233 20.3834 18.4015 20.6898 18.088 20.4621L13.7351 17.2995C13.5949 17.1976 13.4051 17.1976 13.2649 17.2995L8.912 20.4621C8.59851 20.6898 8.17672 20.3834 8.29646 20.0148L9.95912 14.8977C10.0127 14.7329 9.954 14.5524 9.81381 14.4505L5.46092 11.2879C5.14744 11.0602 5.30855 10.5643 5.69604 10.5643H11.0765C11.2498 10.5643 11.4034 10.4528 11.4569 10.2879L13.1196 5.17082Z" fill="white"/>
						</svg>
					</span>

					<div className="button_icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 69" fill="none">
							<path d="M32 1C49.0513 1 63 15.9263 63 34.5C63 53.0737 49.0513 68 32 68C14.9487 68 1 53.0737 1 34.5C1 15.9263 14.9487 1 32 1Z" stroke="white" strokeWidth="2"/>
							<circle cx="32" cy="26" r="15" stroke="white" strokeWidth="2"/>
							<path d="M23.5 22.5002C20.9616 24.0623 17.5 26.5 17.5 26.5C17.5 26.5 21 25.5 23 28.5C25 31.5 28.1488 33.0002 32 33C35.5 32.9998 40.036 30.455 42 28C44 25.5 46.5 26.5 46.5 26.5C46.5 26.5 43.3364 24.0163 39.5 22C36.25 20.2919 36 20 32 20C28 20 26.0384 20.9381 23.5 22.5002Z" stroke="white" strokeWidth="2"/>
							<path d="M16 47.5C16 47.5 21 56.5 32 56.5C42 56.5 48 47 48 47" stroke="white" strokeWidth="2"/>
						</svg>
					</div>

					<p className="button_text">Клостридия</p>
				</button>

				<button 
					className={`${selectedBacteria === "sphingomonas" ? "_active" : ""} ${
						bacteriaVictoryState.sphingomonas ? "_victory" : ""
					}`}
					onClick={() => onBacteriaSelect("Сфингомонады")}
				>
					<span className="icon_victory">
						<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
							<circle cx="13.5" cy="13.5" r="13.5" fill="#B6D14E"/>
							<path d="M13.1196 5.17082C13.2393 4.80229 13.7607 4.8023 13.8804 5.17082L15.5431 10.2879C15.5966 10.4528 15.7502 10.5643 15.9235 10.5643H21.304C21.6915 10.5643 21.8526 11.0602 21.5391 11.2879L17.1862 14.4505C17.046 14.5524 16.9873 14.7329 17.0409 14.8977L18.7035 20.0148C18.8233 20.3834 18.4015 20.6898 18.088 20.4621L13.7351 17.2995C13.5949 17.1976 13.4051 17.1976 13.2649 17.2995L8.912 20.4621C8.59851 20.6898 8.17672 20.3834 8.29646 20.0148L9.95912 14.8977C10.0127 14.7329 9.954 14.5524 9.81381 14.4505L5.46092 11.2879C5.14744 11.0602 5.30855 10.5643 5.69604 10.5643H11.0765C11.2498 10.5643 11.4034 10.4528 11.4569 10.2879L13.1196 5.17082Z" fill="white"/>
						</svg>
					</span>

					<div className="button_icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 76" fill="none">
							<path d="M3.49983 35.2975C0.966281 44.3211 1.49995 54 3.49983 59.2975C7.92739 71.0256 18.303 74.7974 28.9998 74.7974C44.0048 74.7974 55.9999 63 56.4999 53C57.0182 42.6339 54.4999 39.687 54.4999 32.5273C54.4999 26.0273 56.9998 25.5273 56.9998 19.2983C56.9998 16.7983 56.7663 13.2974 56.4998 12.2974C54.6778 5.46068 48.9998 2.29836 42.9998 1.29745C24.5748 -1.77621 7.9 19.6255 3.49983 35.2975Z" stroke="white" strokeWidth="2"/>
							<circle cx="43" cy="14.0273" r="4" stroke="white" strokeWidth="2"/>
							<path d="M13.5 58.0273C13.5 58.0273 18.8587 60.7453 22.5 60.5273C25.1511 60.3686 26.3441 58.5273 29 58.5273C31.6559 58.5273 32.8489 60.3686 35.5 60.5273C39.1413 60.7453 44.5 58.0273 44.5 58.0273" stroke="white" strokeWidth="2"/>
							<path d="M26.5002 40.5273C27.0002 42.0273 21.1129 48.2532 17 48.0273C12.7063 47.7915 7.82843 41.6435 8.49868 40.5273C9.99997 38.0273 13.5002 36.5273 14.4987 36.5273H20.4987C21.8284 36.5273 25.5002 37.5273 26.5002 40.5273Z" stroke="white" strokeWidth="2"/>
							<circle cx="17.5" cy="39.5273" r="2.5" stroke="white" strokeWidth="2"/>
							<path d="M49.0637 40.5273C49.5637 42.0273 43.6763 48.2532 39.5635 48.0273C35.2697 47.7915 30.3919 41.6435 31.0622 40.5273C32.5634 38.0273 36.0637 36.5273 37.0622 36.5273H43.0621C44.3918 36.5273 48.0637 37.5273 49.0637 40.5273Z" stroke="white" strokeWidth="2"/>
							<circle cx="40.0635" cy="39.5273" r="2.5" stroke="white" strokeWidth="2"/>
						</svg>
					</div>
					<p className="button_text">Сфингомонады</p>
				</button>

				<button 
					className={`${selectedBacteria === "flavobacteria" ? "_active" : ""} ${
						bacteriaVictoryState.flavobacteria ? "_victory" : ""
					}`}
					onClick={() => onBacteriaSelect("Флавобактерии")}
				>
					<span className="icon_victory">
						<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
							<circle cx="13.5" cy="13.5" r="13.5" fill="#B6D14E"/>
							<path d="M13.1196 5.17082C13.2393 4.80229 13.7607 4.8023 13.8804 5.17082L15.5431 10.2879C15.5966 10.4528 15.7502 10.5643 15.9235 10.5643H21.304C21.6915 10.5643 21.8526 11.0602 21.5391 11.2879L17.1862 14.4505C17.046 14.5524 16.9873 14.7329 17.0409 14.8977L18.7035 20.0148C18.8233 20.3834 18.4015 20.6898 18.088 20.4621L13.7351 17.2995C13.5949 17.1976 13.4051 17.1976 13.2649 17.2995L8.912 20.4621C8.59851 20.6898 8.17672 20.3834 8.29646 20.0148L9.95912 14.8977C10.0127 14.7329 9.954 14.5524 9.81381 14.4505L5.46092 11.2879C5.14744 11.0602 5.30855 10.5643 5.69604 10.5643H11.0765C11.2498 10.5643 11.4034 10.4528 11.4569 10.2879L13.1196 5.17082Z" fill="white"/>
						</svg>
					</span>

					<div className="button_icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 69" fill="none">
							<circle cx="34.5" cy="34.5" r="33.5" stroke="white" strokeWidth="2"/>
							<circle cx="41.5" cy="11.5" r="3.5" stroke="white" strokeWidth="2"/>
							<path d="M55 8.00175C55 8.00175 57.9964 6 60 7.50175C62.219 9.16496 60.5 13.0018 60.5 13.0018" stroke="white" strokeWidth="2"/>
							<path d="M7.37509 15.2067C7.37509 15.2067 3.90661 14.2295 2.46548 16.2771C0.869408 18.5449 3.69047 21.6622 3.69047 21.6622" stroke="white" strokeWidth="2"/>
							<path d="M34.5 21C21 21 9 33 9 33C9 33 21.5 45.2029 34.5 45C48.5 44.7815 59 33 59 33C59 33 49 21 34.5 21Z" stroke="white" strokeWidth="2"/>
							<path d="M10 32.5C10 32.5 14.3111 29.7772 21.4047 28M58.5 32.5C58.5 32.5 54.7269 29.9842 47.7225 28.2107M21.4047 28C24.8413 27.139 28.931 26.5 33.5 26.5C39.14 26.5 43.9099 27.2454 47.7225 28.2107M21.4047 28C21.4047 28 25 39 34.5 39C44.265 39 47.7225 28.2107 47.7225 28.2107" stroke="white" strokeWidth="2"/>
							<path d="M16 52.5C16 52.5 25.5 57.5 34 57.5C42.5 57.5 52.5 52.5 52.5 52.5" stroke="white" strokeWidth="2"/>
						</svg>
					</div>
					<p className="button_text">Флавобактерии</p>
				</button>

				<button 
					className={`${selectedBacteria === "pediococcus" ? "_active" : ""} ${
						bacteriaVictoryState.pediococcus ? "_victory" : ""
					}`}
					onClick={() => onBacteriaSelect("Педиококки")}
				>
					<span className="icon_victory">
						<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
							<circle cx="13.5" cy="13.5" r="13.5" fill="#B6D14E"/>
							<path d="M13.1196 5.17082C13.2393 4.80229 13.7607 4.8023 13.8804 5.17082L15.5431 10.2879C15.5966 10.4528 15.7502 10.5643 15.9235 10.5643H21.304C21.6915 10.5643 21.8526 11.0602 21.5391 11.2879L17.1862 14.4505C17.046 14.5524 16.9873 14.7329 17.0409 14.8977L18.7035 20.0148C18.8233 20.3834 18.4015 20.6898 18.088 20.4621L13.7351 17.2995C13.5949 17.1976 13.4051 17.1976 13.2649 17.2995L8.912 20.4621C8.59851 20.6898 8.17672 20.3834 8.29646 20.0148L9.95912 14.8977C10.0127 14.7329 9.954 14.5524 9.81381 14.4505L5.46092 11.2879C5.14744 11.0602 5.30855 10.5643 5.69604 10.5643H11.0765C11.2498 10.5643 11.4034 10.4528 11.4569 10.2879L13.1196 5.17082Z" fill="white"/>
						</svg>
					</span>
					
					<div className="button_icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 70" fill="none">
							<path d="M31 3.03906C39.6589 3.03906 47.4869 6.81975 53.1113 12.9131L51.541 14.1592C46.2722 8.51437 38.9901 5.03906 31 5.03906C15.0997 5.03906 2 18.7986 2 36.0391C2 53.2795 15.0997 67.0391 31 67.0391C46.9003 67.0391 60 53.2795 60 36.0391C60 29.0748 57.8618 22.6791 54.2656 17.5283L55.834 16.2842C59.7064 21.7918 62 28.6303 62 36.0391C62 54.2645 48.1208 69.0391 31 69.0391C13.8792 69.0391 0 54.2645 0 36.0391C0 17.8137 13.8792 3.03906 31 3.03906Z" fill="white"/>
							<path d="M8.5 14.5391C8.5 14.5391 14.514 0.155993 33.5 1.03906C51.5 1.87626 64 13.5391 64 18.0391C64 24.5391 58 22.5391 58 22.5391" stroke="white" strokeWidth="2"/>
							<path d="M13 50.5391C13 50.5391 22.5 55.5391 31 55.5391C39.5 55.5391 49.5 50.5391 49.5 50.5391" stroke="white" strokeWidth="2"/>
							<path d="M9.9999 34.0391C9.9999 34.0391 18.9999 25.5391 30.4999 25.5391C40.9999 25.5391 50.9999 33.0391 50.9999 33.0391M9.9999 34.0391C9.9999 34.0391 21.9074 42.1872 30.4999 42.0391C39.2419 41.8884 50.9999 33.0391 50.9999 33.0391M9.9999 34.0391C9.9999 34.0391 9.28716 18.039 30.4999 18.0391C51.7126 18.0392 50.9999 33.0391 50.9999 33.0391" stroke="white" strokeWidth="2"/>
							<path d="M30.5 26.0391C35.2461 26.0391 39 29.671 39 34.0391C39 38.4071 35.2461 42.0391 30.5 42.0391C25.7539 42.0391 22 38.4071 22 34.0391C22 29.671 25.7539 26.0391 30.5 26.0391Z" stroke="white" strokeWidth="2"/>
						</svg>
					</div>
					<p className="button_text">Педиококки</p>
				</button>
			</div>
			
			<button className="button_restart" onClick={onRestart}>
				<span className="button_icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
						<circle cx="24" cy="24" r="23.5" stroke="#A5DFAD"/>
						<circle cx="24" cy="24" r="20" transform="rotate(-180 24 24)" fill="url(#paint0_radial_526_63)"/>
						<path d="M12.4034 28.3475C12.4034 28.3475 10.3618 20.6948 15.4645 15.5922C21.0765 9.9801 28.7296 12.5306 29.75 13.0409C31.7909 14.0613 32.8118 15.5922 32.8118 15.5922M32.8118 15.5922L32.8113 11M32.8118 15.5922L28.7296 15.5919" stroke="white" strokeWidth="1.5"/>
						<path d="M35.3621 19.1634C35.3621 19.1634 37.9133 27.3263 32.8117 32.429C27.2002 38.0417 19.5 35.1585 18.1238 34.4704C16.0829 33.4499 15.0619 31.919 15.0619 31.919M15.0619 31.919L15.0625 36.5112M15.0619 31.919L19.1442 31.9193" stroke="white" strokeWidth="1.5"/>
						<defs>
							<radialGradient id="paint0_radial_526_63" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35 8) rotate(124.509) scale(38.833)">
								<stop stopColor="#1AD7FF"/>
								<stop offset="0.48632" stopColor="#1650FF"/>
								<stop offset="1" stopColor="#152BC3"/>
							</radialGradient>
						</defs>
					</svg>
				</span>

				<p>Начать <br/> сначала</p>
			</button>
		</div>
	);
}