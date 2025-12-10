"use client";

import { useState, useEffect } from 'react';

import './block_controls.css';
import './block_controls_media.css';



const BlockControls = ({ isMobile, experimentState, funSwiperPrev, funSwiperNext, artInfo, handleSelectClick, handleBackClick, handleExperimentSolventClick, handleExperimentAntibioticClick }) => {
	const [stageExperiment, currentStep] = experimentState;
	
	const [partStartShow, setPartStartShow] = useState(true);
	const [partStartHidden, setPartStartHidden] = useState(false);

	const [partMainShow, setPartMainShow] = useState(false);
	const [partMainShort, setPartMainShort] = useState(false);
	const [partMainHidden, setPartMainHidden] = useState(false);

	const [partFinalShow, setPartFinalShow] = useState(false);
	const [partFinalHidden, setPartFinalHidden] = useState(true);


	useEffect(() => {
		if(stageExperiment === "art_select"){
			setPartStartShow(true);

			setTimeout(() => {
				setPartStartHidden(false);
			}, 50);

			setTimeout(() => {
				setPartMainShow(false);
				setPartMainShort(false);
				setPartMainHidden(false);

				setPartFinalShow(false);
				setPartFinalHidden(true);
			}, 1000);	
		} else if(stageExperiment === "experiment_select"){
			setPartMainShow(true);
			setPartStartHidden(true);

			setTimeout(() => {
				setPartStartShow(false);
			}, 1000);
		} else if(stageExperiment === "antibiotic"){
			setPartMainShort(true);

			if(currentStep === 5){
				setPartMainHidden(true);

				setPartFinalShow(true);
				setTimeout(() => {
					setPartFinalHidden(false);
				}, 100);
			} else if(currentStep === 0){
				setPartFinalHidden(true);

				setPartMainHidden(true);
				setTimeout(() => {
					setPartMainHidden(false);
				}, 100);
			}
		} else if(stageExperiment === "solvent"){
			setPartMainShort(true);

			if(currentStep === 6 || currentStep === 7){
				setPartMainHidden(true);

				setPartFinalShow(true);
				setTimeout(() => {
					setPartFinalHidden(false);
				}, 100);
			} else if(currentStep === 0){
				setPartFinalHidden(true);

				setPartMainHidden(true);
				setTimeout(() => {
					setPartMainHidden(false);
				}, 100);
			}
		}
	}, [stageExperiment, currentStep]);


	return (
		<div className="zaa_block_controls">
			{partStartShow && (
				<div className={`part_start ${partStartHidden ? "_hidden" : ''}`}>
					{isMobile ? (
						<>
							<div className="block_top">
								<div className="art_info">
									<h3 className="title">{artInfo.title}</h3>
									
									<p>
										<span className="author">{artInfo.author}</span>
										{artInfo.year && <span className="year">{artInfo.year}</span>}
									</p>
								</div>
							</div>

							<div className="block_bottom">
								<div className="slider_nav">
									<button onClick={funSwiperPrev}>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 24" fill="none">
												<path d="M12.5 23L2 12.5L12.5 1" stroke="white" strokeWidth="2"/>
											</svg>
										</span>
									</button>

									<button onClick={funSwiperNext}>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
												<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
											</svg>
										</span>
									</button>
								</div>

								<button className="button_select" onClick={handleSelectClick}>
									<span className="button_text">Выбрать</span>
									
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
											<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
										</svg>
									</span>
								</button>
							</div>
						</>
					) : (
						<>
							<div className="slider_nav">
								<button onClick={funSwiperPrev}>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 24" fill="none">
											<path d="M12.5 23L2 12.5L12.5 1" stroke="white" strokeWidth="2"/>
										</svg>
									</span>
								</button>

								<button onClick={funSwiperNext}>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
											<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
										</svg>
									</span>
								</button>
							</div>

							<div className="art_info">
								<h3 className="title">{artInfo.title}</h3>
								
								<p>
									<span className="author">{artInfo.author}</span>
									{artInfo.year && <span className="year">{artInfo.year}</span>}
								</p>
							</div>

							<button className="button_select" onClick={handleSelectClick}>
								<span className="button_text">Выбрать</span>
								
								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</button>
						</>
					)}
				</div>
			)}

			{partMainShow && (
				<div className={`part_main ${partMainShort ? "_short" : ''} ${partMainHidden ? "_hidden" : ''}`}>
					<button className="button_back" onClick={handleBackClick}>
						<span className="button_icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 24" fill="none">
								<path d="M12.5 23L2 12.5L12.5 1" stroke="white" strokeWidth="2"/>
							</svg>
						</span>

						<span className="button_text">Назад</span>
					</button>

					<div className="buttons_experiment">
						<button className="button_select" onClick={handleExperimentSolventClick}>
							<span className="button_text">Эксперемент с растворителем</span>
							
							<span className="button_icon">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
									<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
								</svg>
							</span>
						</button>

						<button className="button_select" onClick={handleExperimentAntibioticClick}>
							<span className="button_text">Эксперемент с антибиотиком</span>
							
							<span className="button_icon">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
									<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
								</svg>
							</span>
						</button>
					</div>
				</div>
			)}

			{partFinalShow && (
				<div className={`part_final ${partFinalHidden ? "_hidden" : ''}`}>
					<button className="button_back" onClick={handleBackClick}>
						<span className="button_text">Выбрать другую картину</span>
						
						<span className="button_icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
								<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
							</svg>
						</span>
					</button>


					{stageExperiment === "solvent" && (
						<div className="buttons_experiment">
							<button className="button_select" onClick={handleExperimentAntibioticClick}>
								<span className="button_text">Эксперемент с антибиотиком</span>
								
								<span className="button_icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</button>

							<button className="button_back" onClick={handleExperimentSolventClick}>
								<span className="button_text">Попробовать еще раз</span>
								
								<span className="button_icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</button>
						</div>
					)}

					{stageExperiment === "antibiotic" && (
						<div className="buttons_experiment">
							<button className="button_select" onClick={handleExperimentSolventClick}>
								<span className="button_text">Эксперемент с растворителем</span>
								
								<span className="button_icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</button>

							<button className="button_back" onClick={handleExperimentAntibioticClick}>
								<span className="button_text">Попробовать еще раз</span>
								
								<span className="button_icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default BlockControls;