"use client";

import { useState, useEffect } from 'react';

import './block_infections.css';
import './block_infections_media.css';

import infectionImg1 from '../../img/infections/1.png';
import infectionImg2 from '../../img/infections/2.png';
import infectionImg3 from '../../img/infections/3.png';
import infectionImg4 from '../../img/infections/4.png';

import solventInArt from '../../img/infections/solvent_in_art.png';



const BlockInfections = ({ experimentState, onInfectionsClick, funFinalExperiment }) => {
	const [stageExperiment, currentStep] = experimentState;

	const [blockInfectionsShow, setBlockInfectionsShow] = useState(false);
	const [blockInfectionsHidden, setBlockInfectionsHidden] = useState(true);

	useEffect(() => {
		if((stageExperiment === "solvent" || stageExperiment === "antibiotic") && currentStep === 0){
			setHiddenInfections([]);
			setBlockInfectionsShow(true);
			setSolventInArtHidden(true);

			setTimeout(() => {
				setBlockInfectionsHidden(false);
				setTipClickHidden(false);
			}, 50);
		} else if(stageExperiment != "solvent" && stageExperiment != "antibiotic"){
			setBlockInfectionsHidden(true);

			setTimeout(() => {
				setBlockInfectionsShow(false);

				setHiddenInfections([]);
			}, 1000);
		}

		if(stageExperiment === "solvent" && currentStep === 6){
			setSolventInArtHidden(false);
		}
	}, [stageExperiment, currentStep]);


	const [hiddenInfections, setHiddenInfections] = useState([]);
	const [tipClickHidden, setTipClickHidden] = useState(true);
	const [solventInArtHidden, setSolventInArtHidden] = useState(true);

	const handleInfectionClick = (infectionId) => {
		if(currentStep === 0) {
			onInfectionsClick();
			setTipClickHidden(true);
		} else if(stageExperiment === "antibiotic" && currentStep === 4) {
			setHiddenInfections([...hiddenInfections, infectionId]);
		} else if(stageExperiment === "solvent" && currentStep === 4) {
			const solventElement = document.querySelector('#solvent-in-art');
			
			if (solventElement) {
				const rect = solventElement.getBoundingClientRect();
				const width = rect.width;
				const height = rect.height;
				
				const clickX = event.clientX;
				const clickY = event.clientY;
				
				const centerX = clickX - width / 2;
				const centerY = clickY - height / 2;
				
				document.documentElement.style.setProperty('--solvent-top', `${centerY}px`);
				document.documentElement.style.setProperty('--solvent-left', `${centerX}px`);
			}

			onInfectionsClick();
		}
	};

	useEffect(() => {
        if(hiddenInfections.length === 4 && currentStep === 4) {
            funFinalExperiment();
        }
    }, [hiddenInfections, currentStep]);



	return (
        <>
            {blockInfectionsShow && (
                <div className={`zaa_block_infections ${blockInfectionsHidden ? "_hidden" : ''}`}>
					<span
						className={`infection_img ${hiddenInfections.includes(1) ? "_hidden" : ""}`}
						onClick={() => handleInfectionClick(1)}
						role="button"
						tabIndex={0}
					>
						<img src={infectionImg1.src} alt="Infection 1" />
					</span>

					<span
						className={`infection_img ${hiddenInfections.includes(2) ? "_hidden" : ""}`}
						onClick={() => handleInfectionClick(2)}
						role="button"
						tabIndex={0}
					>
						<img src={infectionImg2.src} alt="Infection 2" />
					</span>

					<span
						className={`infection_img ${hiddenInfections.includes(3) ? "_hidden" : ""}`}
						onClick={() => handleInfectionClick(3)}
						role="button"
						tabIndex={0}
					>
						<img src={infectionImg3.src} alt="Infection 3" />
					</span>

					<span
						className={`infection_img ${hiddenInfections.includes(4) ? "_hidden" : ""}`}
						onClick={() => handleInfectionClick(4)}
						role="button"
						tabIndex={0}
					>
						<img src={infectionImg4.src} alt="Infection 4" />
					</span>

					<div className={`tip_click ${tipClickHidden ? "_hidden" : ""}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="45" height="50" viewBox="0 0 45 50" fill="none">
							<rect x="16.0372" y="7.19794" width="6" height="2" rx="1" transform="rotate(-33.363 16.0372 7.19794)" fill="white"/>
							<rect x="12" y="5.69346" width="6" height="2" rx="1" transform="rotate(-71.6062 12 5.69346)" fill="white"/>
							<rect x="7.84216" y="6.23153" width="6" height="2" rx="1" transform="rotate(-118.274 7.84216 6.23153)" fill="white"/>
							<rect x="5.87912" y="10.158" width="6" height="2" rx="1" transform="rotate(-168.479 5.87912 10.158)" fill="white"/>
							<rect x="6.31381" y="14.8573" width="6" height="2" rx="1" transform="rotate(158.228 6.31381 14.8573)" fill="white"/>
							<path d="M39 45C28.6196 54.0828 13.5 40.5 9.99997 38C7.49997 36.2143 8.7782 31.2594 12.5 32.5C16.2218 33.7406 19.9165 35.3331 19.5 34.5C18.5 32.5 9.78512 15.0937 8.99999 13C7.5 9 11.5 6.5 14 10C16.7417 13.8384 23 28.3334 22.5 27C21.5625 24.5 19.7276 21 19.5 19.5C19.1249 17.0283 22 16 23 17C24.2747 18.2748 27 23 28 24.5C28.3333 25 25.5 20 25.5 18C25.5 16 28.3028 15.3028 29.5 16.5C30.5 17.5 32.5 21 33 21.5C33.3535 21.8536 32.2772 18.8863 32 17.5C31.5 15 35 14.5714 36 16C39.5 21 49.8571 35.5 39 45Z" stroke="white" strokeWidth="2"/>
						</svg>
					</div>

					<div className={`solvent_in_art ${solventInArtHidden ? "_hidden" : ""}`} id="solvent-in-art">
						<img src={solventInArt.src} alt="solvent in art" />
					</div>
                </div>
            )}
        </>
	);
};

export default BlockInfections;