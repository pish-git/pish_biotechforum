"use client";

import { useState, useRef } from 'react';
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import './main_screen.css';
import './main_screen_media.css';

import TipLeft from '../tips/TipLeft';
import BlockControls from '../block_controls/BlockControls';
import BlockInfections from '../block_infections/BlockInfections';

import VialImg1 from '../../img/vials/petri.png';
import VialImg1Active from '../../img/vials/petri_active.png';
import VialImg2 from '../../img/vials/solvent.png';
import VialImg3 from '../../img/vials/antibiotic.png';
import VialImgStandardActive from '../../img/vials/standard_active.png';

export const instructionsForTipRight = {
	solvent: {
		1: "Поместите образец патогена с картины в чашку Петри с питательной средой",
		3: "Протестируйте растворитель на патогене в чашке Петри",
	},
	antibiotic: {
		1: "Поместите образец патогена с картины в чашку Петри с питательной средой",
		3: "Протестируйте антибиотик на патогене в чашке Петри",
	},
};

import art1Webp from '../../img/arts/art1.webp';
import art1 from '../../img/arts/art1.jpg';
import art2Webp from '../../img/arts/art2.webp';
import art2 from '../../img/arts/art2.jpg';
import art3Webp from '../../img/arts/art3.webp';
import art3 from '../../img/arts/art3.jpg';

const paintingsData = [
	{
		id: 1,
		title: "Богатыри",
		author: "Виктор Васнецов",
		year: "1898",
		img: art1,
		imgWebp: art1Webp
	},
	{
		id: 2,
		title: "Христос в шторм на Галилейском море",
		author: "Рембрандт",
		year: "1633",
		img: art2,
		imgWebp: art2Webp
	},
	{
		id: 3,
		title: "Огни большого города",
		author: "Артем Малыгин",
		year: "",
		img: art3,
		imgWebp: art3Webp
	}
];

export default function MainScreen({ isMobile }) {
	const [stageExperiment, setStageExperiment] = useState("art_select");
  	const [currentStep, setCurrentStep] = useState(0);

	const handleArtSelectClick = () => {
		setStageExperiment("art_select");
		setCurrentStep(0);

		setPetriActive(false);
		setPetriClick(false);
		setTipPetriShow(false);
		setDescriptionPetriShow(false);
		
		setSolventActive(false);
		setSolventClick(false);
		setTipSolventShow(false);
		setDescriptionSolventShow(false);

		setAntibioticActive(false);
		setAntibioticClick(false);
		setTipAntibioticShow(false);
		setDescriptionAntibioticShow(false);
	};

	const handleExperimentSelectClick = () => {
		setStageExperiment("experiment_select");
		setCurrentStep(0);
	};

	const handleExperimentSolventClick = () => {
		setStageExperiment("solvent");
		setCurrentStep(0);

		setDescriptionPetriShow(true);
		setDescriptionSolventShow(true);
		setDescriptionAntibioticShow(true);
	};

	const handleExperimentAntibioticClick = () => {
		setStageExperiment("antibiotic");
		setCurrentStep(0);

		setDescriptionPetriShow(true);
		setDescriptionSolventShow(true);
		setDescriptionAntibioticShow(true);
	};

	const handleInfectionsClick = () => {
		if (currentStep === 0) {
			setCurrentStep(1);
			setTipPetriShow(true);
			setPetriClick(true);
		} else if(stageExperiment === "solvent" && currentStep === 4) {
			setCurrentStep(5);
		}
	};

	const handlePathogenInPetri = () => {
		if (stageExperiment === "antibiotic" && currentStep === 1) {
			setCurrentStep(2);

			setPetriActive(true);
			setTipPetriShow(false);
			setTipAntibioticShow(true);

			setPetriClick(false);
			setAntibioticClick(true);
		} else if (stageExperiment === "solvent" && currentStep === 1) {
			setCurrentStep(2);

			setPetriActive(true);
			setTipPetriShow(false);
			setTipSolventShow(true);

			setPetriClick(false);
			setSolventClick(true);
		}

		if (currentStep === 3) {
			setCurrentStep(4);

			setPetriActive(false);
			setTipPetriShow(false);
		}
	};

	const handleTakeSolvent = () => {
		if(stageExperiment === "solvent" && currentStep === 2){
			setCurrentStep(3);

			setSolventActive(true);
			setTipSolventShow(false);

			setTipPetriShow(true);

			setSolventClick(false);
		}
	};

	const handlePlaceSolventOnArt = (placeSolventOnArt) => {
		if(stageExperiment === "solvent" && currentStep === 5 && placeSolventOnArt){
			setCurrentStep(6);

			setPetriActive(false);
			setTipPetriShow(false);
			setDescriptionPetriShow(false);

			setSolventActive(false);
			setTipSolventShow(false);
			setDescriptionSolventShow(false);

			setAntibioticActive(false);
			setTipAntibioticShow(false);
			setDescriptionAntibioticShow(false);
		} else if(stageExperiment === "solvent" && currentStep === 5 && !placeSolventOnArt){
			setCurrentStep(7);

			setPetriActive(false);
			setTipPetriShow(false);
			setDescriptionPetriShow(false);

			setSolventActive(false);
			setTipSolventShow(false);
			setDescriptionSolventShow(false);

			setAntibioticActive(false);
			setTipAntibioticShow(false);
			setDescriptionAntibioticShow(false);
		}
	};

	const handleTakeAntibiotic = () => {
		if(stageExperiment === "antibiotic" && currentStep === 2){
			setCurrentStep(3);

			setAntibioticActive(true);
			setTipAntibioticShow(false);

			setTipPetriShow(true);

			setAntibioticClick(false);
		}
	};

	const handleFinalExperiment = () => {
		setCurrentStep(5);

		setPetriActive(false);
		setPetriClick(false);
		setTipPetriShow(false);
		setDescriptionPetriShow(false);

		setSolventActive(false);
		setSolventClick(false);
		setTipSolventShow(false);
		setDescriptionSolventShow(false);

		setAntibioticActive(false);
		setAntibioticClick(false);
		setTipAntibioticShow(false);
		setDescriptionAntibioticShow(false);
	};

	const [currentPainting, setCurrentPainting] = useState(paintingsData[0]);
	const swiperRef = useRef(null);

	const handleSlideChange = (swiper) => {
		setCurrentPainting(paintingsData[swiper.realIndex]);
	};

	const goNext = () => {
		if (swiperRef.current) { swiperRef.current.slideNext(); }
	};

	const goPrev = () => {
		if (swiperRef.current) { swiperRef.current.slidePrev(); }
	};

	const [petriActive, setPetriActive] = useState(false);
	const [petriClick, setPetriClick] = useState(false);
  	const [tipPetriShow, setTipPetriShow] = useState(false);
  	const [descriptionPetriShow, setDescriptionPetriShow] = useState(false);

	const [solventActive, setSolventActive] = useState(false);
	const [solventClick, setSolventClick] = useState(false);
  	const [tipSolventShow, setTipSolventShow] = useState(false);
  	const [descriptionSolventShow, setDescriptionSolventShow] = useState(false);

	const [antibioticActive, setAntibioticActive] = useState(false);
	const [antibioticClick, setAntibioticClick] = useState(false);
  	const [tipAntibioticShow, setTipAntibioticShow] = useState(false);
  	const [descriptionAntibioticShow, setDescriptionAntibioticShow] = useState(false);

	

	return (
		<div className="main_window">
			<TipLeft experimentState={[stageExperiment, currentStep]} handlePlaceSolventOnArt={handlePlaceSolventOnArt}/>

			{!isMobile ? (
				<>
					<div className="block_left">
						<BlockInfections experimentState={[stageExperiment, currentStep]} onInfectionsClick={handleInfectionsClick} funFinalExperiment={handleFinalExperiment} />

						<div className="block_swiper">
							<Swiper
								modules={[Navigation]}
								spaceBetween={0}
								slidesPerView={1}
								loop={true}
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={handleSlideChange}
							>
								{paintingsData.map((painting) => (
									<SwiperSlide key={painting.id}>
										<div className="block_img">
											<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
												<source srcSet={painting.imgWebp.src} type="image/webp" />
												<source srcSet={painting.img.src} type="image/jpeg" />
												<Image 
													src={painting.img.src} 
													alt={painting.title} 
													fill
													unoptimized={true}
													objectFit='cover'
													objectPosition='top'
												/>
											</picture>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						<BlockControls 
							experimentState={[stageExperiment, currentStep]} 
							funSwiperPrev={goPrev} 
							funSwiperNext={goNext} 
							artInfo={currentPainting}
							handleSelectClick={handleExperimentSelectClick}
							handleBackClick={handleArtSelectClick}
							handleExperimentSolventClick={handleExperimentSolventClick}
							handleExperimentAntibioticClick={handleExperimentAntibioticClick}
						/>
					</div>

					<div className="block_right">
						<div className={`block_vial ${petriClick ? "_click" : ""} ${petriActive ? "_active" : ""} ${descriptionPetriShow ? "_description_on" : ""} ${tipPetriShow ? "_tip_on" : ""}`}>
							<button onClick={handlePathogenInPetri}>
								<img src={VialImg1.src} alt="Petri vial" />
								<img className="additional_img" src={VialImg1Active.src} alt="Pathogen in petri" />
							</button>

							<span className="description">
								<p>среда питательная</p>
							</span>
							
							<div className="tip">
								<p>{instructionsForTipRight[stageExperiment]?.[currentStep] ?? ""}</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>

						<div className={`block_vial ${solventClick ? "_click" : ""} ${solventActive ? "_active" : ""} ${descriptionSolventShow ? "_description_on" : ""} ${tipSolventShow ? "_tip_on" : ""}`}>
							<button onClick={handleTakeSolvent}>
								<img src={VialImg2.src} alt="Solvent vial" />
								<img className="additional_img" src={VialImgStandardActive.src} />
							</button>

							<span className="description">
								<p>растворитель</p>
							</span>

							<div className="tip">
								<p>Поместите растворитель в чашку Петри с образцом патогена</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>

						<div className={`block_vial ${antibioticClick ? "_click" : ""} ${antibioticActive ? "_active" : ""} ${descriptionAntibioticShow ? "_description_on" : ""} ${tipAntibioticShow ? "_tip_on" : ""}`}>
							<button onClick={handleTakeAntibiotic}>
								<img src={VialImg3.src} alt="Antibiotic vial" />
								<img className="additional_img" src={VialImgStandardActive.src} />
							</button>

							<span className="description">
								<p>антибиотик</p>
							</span>

							<div className="tip">
								<p>Поместите антибиотик в чашку Петри с образцом патогена</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="block_mobile">
					<div className="mobile_top_section">
						<BlockInfections experimentState={[stageExperiment, currentStep]} onInfectionsClick={handleInfectionsClick} funFinalExperiment={handleFinalExperiment} />
						
						<div className="block_swiper">
							<Swiper
								modules={[Navigation]}
								spaceBetween={0}
								slidesPerView={1}
								loop={true}
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={handleSlideChange}
							>
								{paintingsData.map((painting) => (
									<SwiperSlide key={painting.id}>
										<div className="block_img">
											<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
												<source srcSet={painting.imgWebp.src} type="image/webp" />
												<source srcSet={painting.img.src} type="image/jpeg" />
												<Image 
													src={painting.img.src} 
													alt={painting.title} 
													fill
													unoptimized={true}
													objectFit='cover'
													objectPosition='top'
												/>
											</picture>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					<div className="block_vials_mobile">
						<div className={`block_vial ${petriClick ? "_click" : ""} ${petriActive ? "_active" : ""} ${descriptionPetriShow ? "_description_on" : ""} ${tipPetriShow ? "_tip_on" : ""}`}>
							<button onClick={handlePathogenInPetri}>
								<img src={VialImg1.src} alt="Petri vial" />
								<img className="additional_img" src={VialImg1Active.src} alt="Pathogen in petri" />
							</button>

							<span className="description">
								<p>среда питательная</p>
							</span>
							
							<div className="tip">
								<p>{instructionsForTipRight[stageExperiment]?.[currentStep] ?? ""}</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>

						<div className={`block_vial ${solventClick ? "_click" : ""} ${solventActive ? "_active" : ""} ${descriptionSolventShow ? "_description_on" : ""} ${tipSolventShow ? "_tip_on" : ""}`}>
							<button onClick={handleTakeSolvent}>
								<img src={VialImg2.src} alt="Solvent vial" />
								<img className="additional_img" src={VialImgStandardActive.src} />
							</button>

							<span className="description">
								<p>растворитель</p>
							</span>

							<div className="tip">
								<p>Поместите растворитель в чашку Петри с образцом патогена</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>

						<div className={`block_vial ${antibioticClick ? "_click" : ""} ${antibioticActive ? "_active" : ""} ${descriptionAntibioticShow ? "_description_on" : ""} ${tipAntibioticShow ? "_tip_on" : ""}`}>
							<button onClick={handleTakeAntibiotic}>
								<img src={VialImg3.src} alt="Antibiotic vial" />
								<img className="additional_img" src={VialImgStandardActive.src} />
							</button>

							<span className="description">
								<p>антибиотик</p>
							</span>

							<div className="tip">
								<p>Поместите антибиотик в чашку Петри с образцом патогена</p>

								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
										<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
									</svg>
								</span>
							</div>
						</div>
					</div>

					<div className="mobile_bottom_section">
						<BlockControls 
							isMobile={isMobile}
							experimentState={[stageExperiment, currentStep]} 
							funSwiperPrev={goPrev} 
							funSwiperNext={goNext} 
							artInfo={currentPainting}
							handleSelectClick={handleExperimentSelectClick}
							handleBackClick={handleArtSelectClick}
							handleExperimentSolventClick={handleExperimentSolventClick}
							handleExperimentAntibioticClick={handleExperimentAntibioticClick}
						/>
					</div>
				</div>
			)}
		</div>
	);
};