"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import './main_part.css';
import './main_part_media.css';

import imgDnk from '../../img/level_1/dnk.png';
import imgDnkWebp from '../../img/level_1/dnk.webp';
import imgRnk from '../../img/level_1/rnk.png';
import imgRnkWebp from '../../img/level_1/rnk.webp';

import imgHitUp from '../../img/level_1/main_part/hint_up.png';
import imgHitUpWebp from '../../img/level_1/main_part/hint_up.webp';

import imgHintFail from '../../img/level_1/main_part/hint_fail.png';
import imgHintFailWebp from '../../img/level_1/main_part/hint_fail.webp';

import imgHintWin from '../../img/level_1/main_part/hint_win.png';
import imgHintWinWebp from '../../img/level_1/main_part/hint_win.webp';



export default function MainPart({ 
	mainPartHidden, 
	firstRowNotes, 
	secondRowNotes, 
	activeNoteIndex, 
	currentPairIndex, 
	timerActive, 
	onAnswer,
	gameCompleted,
	gameResult,
	onNextLevel
}) {
	const [showDefaultHint, setShowDefaultHint] = useState(true);
	const [defaultHintOpacity, setDefaultHintOpacity] = useState(true);
	const [showResultHint, setShowResultHint] = useState(false);
	const [resultHintAnimation, setResultHintAnimation] = useState(false);
	
	const [showGameBlocks, setShowGameBlocks] = useState(true);
	const [gameBlocksOpacity, setGameBlocksOpacity] = useState(true);
	const [showResultBlocks, setShowResultBlocks] = useState(false);
	const [resultBlocksOpacity, setResultBlocksOpacity] = useState(false);

	const [showLevelIntro, setShowLevelIntro] = useState(true);
	const [levelIntroHidden, setLevelIntroHidden] = useState(false);
	
	const [showGameContent, setShowGameContent] = useState(false);
	const [gameContentOpacity, setGameContentOpacity] = useState(false);

	useEffect(() => {
		if (gameCompleted) {
			setDefaultHintOpacity(false);
			
			const timer1 = setTimeout(() => {
				setShowDefaultHint(false);
				setShowResultHint(true);
				
				const timer2 = setTimeout(() => {
					setResultHintAnimation(true);
				}, 50);
				
				return () => clearTimeout(timer2);
			}, 300);
			
			setGameBlocksOpacity(false);
			
			const timer3 = setTimeout(() => {
				setShowGameBlocks(false);
				setShowResultBlocks(true);
				
				const timer4 = setTimeout(() => {
					setResultBlocksOpacity(true);
				}, 100);
				
				return () => clearTimeout(timer4);
			}, 300);
			
			return () => {
				clearTimeout(timer1);
				clearTimeout(timer3);
			};
		} else {
			setShowDefaultHint(true);
			setDefaultHintOpacity(true);
			setShowResultHint(false);
			setResultHintAnimation(false);
			
			setShowGameBlocks(true);
			setGameBlocksOpacity(true);
			setShowResultBlocks(false);
			setResultBlocksOpacity(false);
		}
	}, [gameCompleted]);

	useEffect(() => {
		if (!mainPartHidden) {
			setShowLevelIntro(true);
			
			const timer = setTimeout(() => {
				setLevelIntroHidden(true);
				
				const timer2 = setTimeout(() => {
					setShowLevelIntro(false);
					setShowGameContent(true);
					
					const timer3 = setTimeout(() => {
						setGameContentOpacity(true);
					}, 50);
					
					return () => clearTimeout(timer3);
				}, 700);
				
				return () => clearTimeout(timer2);
			}, 2700);
			
			return () => clearTimeout(timer);
		}
	}, [mainPartHidden]);

	return (
		<div className={`main_part ${mainPartHidden ? '_hidden' : ''}`}>
			{showLevelIntro && (
				<div className={`block_open_level ${levelIntroHidden ? '_hidden' : ''}`}>
					<div className="bg_rnk">
						<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
							<source srcSet={imgRnkWebp.src} type="image/webp" />
							<source srcSet={imgRnk.src} type="image/jpeg" />
							<Image 
								src={imgRnk} 
								alt="" 
								fill
								unoptimized={true}
								objectFit='cover'
							/>
						</picture>
					</div>

					<div className="window_open_level">
						<p><span>Уровень 1</span></p>
						<h1>Создание ркн</h1>
					</div>
				</div>
			)}

			{showGameContent && (
				<div className={`game_content ${gameContentOpacity ? '_fade-in' : ''}`}>
					<div className="block_hint_up">
						{showDefaultHint && (
							<div className={`hint_img default_hint ${!defaultHintOpacity ? 'fade-out' : ''}`}>
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet={imgHitUpWebp.src} type="image/webp" />
									<source srcSet={imgHitUp.src} type="image/jpeg" />
									<Image 
										src={imgHitUp} 
										alt="" 
										fill
										unoptimized={true}
										objectFit='cover'
									/>
								</picture>
							</div>
						)}

						{showResultHint && gameResult === 'fail' && (
							<div className={`hint_img result_hint ${resultHintAnimation ? 'slide-down' : ''}`}>
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet={imgHintFailWebp.src} type="image/webp" />
									<source srcSet={imgHintFail.src} type="image/jpeg" />
									<Image 
										src={imgHintFail} 
										alt="" 
										fill
										unoptimized={true}
										objectFit='cover'
									/>
								</picture>
							</div>
						)}

						{showResultHint && gameResult === 'win' && (
							<div className={`hint_img result_hint ${resultHintAnimation ? 'slide-down' : ''}`}>
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet={imgHintWinWebp.src} type="image/webp" />
									<source srcSet={imgHintWin.src} type="image/jpeg" />
									<Image 
										src={imgHintWin} 
										alt="" 
										fill
										unoptimized={true}
										objectFit='cover'
									/>
								</picture>
							</div>
						)}
					</div>

					{showGameBlocks && (
						<>
							<div className={`block_rnk ${!gameBlocksOpacity ? 'fade-out' : ''}`}>
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet={imgRnkWebp.src} type="image/webp" />
									<source srcSet={imgRnk.src} type="image/jpeg" />
									<Image 
										src={imgRnk} 
										alt="" 
										fill
										unoptimized={true}
									/>
								</picture>
							</div>

							<div className={`block_dnk ${!gameBlocksOpacity ? 'fade-out' : ''}`}>
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet={imgDnkWebp.src} type="image/webp" />
									<source srcSet={imgDnk.src} type="image/jpeg" />
									<Image 
										src={imgDnk} 
										alt="" 
										fill
										unoptimized={true}
									/>
								</picture>
							</div>

							<div className={`block_rkn_notes ${!gameBlocksOpacity ? 'fade-out' : ''}`}>
								<div className="first_row">
									{firstRowNotes.map((note, index) => (
										<div 
											key={index} 
											className={`rnk_note ${note ? `_${note.toLowerCase()}_note` : ''} ${activeNoteIndex === index ? '_active' : ''} ${index <= currentPairIndex ? '_visible' : ''}`}
										></div>
									))}
								</div>

								<div className="second_row">
									{secondRowNotes.map((note, index) => (
										<div 
											key={index} 
											className={`rnk_note ${note ? `_${note.toLowerCase()}_note` : ''} ${index <= currentPairIndex ? '_visible' : ''}`}
										></div>
									))}
								</div>
							</div>

							<div className={`block_btns_notes ${!gameBlocksOpacity ? 'fade-out' : ''}`}>
								<p>Кнопки РКН нот:</p>

								<div className="block_buttons">
									<button 
										className="button_rnk_note _a_note" 
										onClick={() => onAnswer('A')}
										disabled={!timerActive}
									>
										A
									</button>
									<button 
										className="button_rnk_note _u_note" 
										onClick={() => onAnswer('U')}
										disabled={!timerActive}
									>
										U
									</button>
									<button 
										className="button_rnk_note _c_note" 
										onClick={() => onAnswer('C')}
										disabled={!timerActive}
									>
										C
									</button>
									<button 
										className="button_rnk_note _g_note" 
										onClick={() => onAnswer('G')}
										disabled={!timerActive}
									>
										G
									</button>
								</div>
							</div>
						</>
					)}

					{showResultBlocks && (
						<>
							<div className={`block_result_text ${resultBlocksOpacity ? 'fade-in' : ''}`}>
								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" fill="none">
										<circle cx="16.4993" cy="16.4993" r="16.4993" fill="url(#paint0_linear_747_31)"/>
										<path d="M13.5 21.1428H16.75M20 21.1428H16.75M16.75 21.1428V14.6428H13.9643" stroke="white" strokeWidth="2"/>
										<rect x="15.8203" y="10" width="1.85714" height="1.85714" fill="white"/>
										<path d="M26.1641 11.9646C26.8109 13.3412 27.1729 14.8781 27.1729 16.4998L27.1592 17.0486C26.8734 22.6897 22.2092 27.1754 16.4971 27.1755L15.9473 27.1619C14.3802 27.0824 12.9033 26.6631 11.5859 25.9792L11.9678 25.6121C13.3321 26.2914 14.8695 26.6755 16.4971 26.6755C22.1172 26.6754 26.6727 22.1198 26.6729 16.4998C26.6729 15.0145 26.3521 13.6049 25.7803 12.3328L26.1641 11.9646ZM17.0459 5.83667C18.3923 5.90488 19.6723 6.22498 20.8418 6.74683L20.4531 7.12085C19.2371 6.60725 17.9001 6.32304 16.4971 6.323C10.877 6.32323 6.32031 10.8796 6.32031 16.4998C6.32035 17.7607 6.55144 18.9675 6.9707 20.0818L6.5791 20.4578C6.15449 19.3948 5.89475 18.248 5.83398 17.0486L5.82031 16.4998C5.82031 10.6034 10.6008 5.82323 16.4971 5.823L17.0459 5.83667Z" fill="white"/>
											<defs>
											<linearGradient id="paint0_linear_747_31" x1="4.5" y1="5" x2="28" y2="29" gradientUnits="userSpaceOnUse">
												<stop stopColor="#95BC33"/>
												<stop offset="1" stopColor="#08D1B9"/>
											</linearGradient>
										</defs>
									</svg>
								</span>

								<div className="text">
									<>
										{gameResult === 'fail' ? (
											<>
												<p>В организме такие сбои происходят редко</p>
												<p>На следующем уровне вам предстоит передать верную последовательность нуклеоидов рибосоме, чтобы создать белок</p>
											</>
										) : (
											<p>На следующем уровне вам предстоит передать верную последовательность нуклеоидов рибосоме, чтобы создать белок</p>
										)}
									</>
								</div>
							</div>

							<div className={`block_button_next ${resultBlocksOpacity ? 'fade-in' : ''}`}>
								<button onClick={onNextLevel}>
									<span className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="91" height="127" viewBox="0 0 91 127" fill="none">
											<circle cx="15.5" cy="73.5015" r="6.5" stroke="#93ACFC" strokeWidth="6"/>
											<circle cx="43" cy="43.0015" r="9" stroke="#93ACFC" strokeWidth="6"/>
											<circle cx="42.5" cy="42.5015" r="22.5" stroke="#93ACFC" strokeWidth="6"/>
											<circle cx="69.5" cy="12.5015" r="6.5" stroke="#93ACFC" strokeWidth="6"/>
											<circle cx="51.5" cy="3.50146" r="3.5" fill="#93ACFC"/>
											<path d="M84.8323 32.8965C83.1372 26.7508 77.8323 17.3965 77.8323 17.3965L73.3323 20.8965C73.3323 20.8965 78.029 27.9089 79.3323 32.8965C81.8146 42.3965 79.0624 52.3965 77.8323 56.3966C75.5257 63.8965 69.0603 69.8965 64.8324 73.3961C57.6234 79.3633 50.8325 79.3826 49 80.6044C47.1675 81.8263 47.0371 83.8462 49 84.5C50.9629 85.1538 59.5 83.724 67.3324 77.8961C74.7235 72.3965 81.5094 65.3965 83.8324 56.3966C85.8821 48.4558 86.3492 38.3964 84.8323 32.8965Z" fill="#93ACFC"/>
											<path d="M0.893692 52.6085C2.58879 58.7543 7.89368 68.1085 7.89368 68.1085L12.3937 64.6085C12.3937 64.6085 7.69695 57.5961 6.39369 52.6085C3.91133 43.1085 6.66351 33.1085 7.8937 29.1084C10.2002 21.6085 16.6657 15.6085 20.8935 12.1089C28.1026 6.14171 39.5609 5.22579 41.3934 4.00396C43.226 2.78212 43.3563 0.762219 41.3934 0.108405C39.4306 -0.545408 26.226 1.78096 18.3935 7.60894C11.0024 13.1085 4.21653 20.1085 1.89352 29.1084C-0.1561 37.0492 -0.623266 47.1086 0.893692 52.6085Z" fill="#93ACFC"/>
											<path d="M27 125.501C27 125.501 17.8839 112.92 16 103.501C15 98.5012 18 94.0012 23.5 95.5012C30.7128 97.4683 36 112.501 36 112.501C36 112.501 37 56.5011 37 50.0012C37 46.4999 49.5 46.9997 49.5 50.0012C49.5 58.4997 49.5 82.5012 49.5 82.5012M49.5 102.501V82.5012M49.5 82.5012C49.5 82.5012 62 81.9999 62 84.5012C62 89.9999 62 102.501 62 102.501C62 102.501 62.5 90.9986 63 85.4999C63.2274 82.9986 73.3947 83.4999 73.5 85.4999C73.6053 87.4999 74.1095 96.0812 74.5 103.501C74.5 103.501 75.5 93.4987 76 90C76.5718 85.9987 87 87.9988 87 90.5C87 95.9988 88 124.001 88 124.001" stroke="#93ACFC" strokeWidth="5"/>
										</svg>
									</span>
									<span className="text">перейти на следующий уровень</span>
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
}