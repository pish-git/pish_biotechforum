// MainScreen.js
"use client";

import { useState, useEffect } from 'react';

import './main_screen.css';
import './main_screen_media.css';

import BlockPartitions from '../block_partitions/BlockPartitions';
import BlockPartition from '../block_partition/BlockPartition';
import BlockBiotechnologies from '../block_biotechnologies/BlockBiotechnologies';



export default function MainScreen({ stateButton, funForButton, hiddenStatus }) {
	const [activeBlock, setActiveBlock] = useState(false);
	const [currentView, setCurrentView] = useState('partitions'); // 'partitions' | 'partition' | 'biotechnologies'
	
	// Состояния для BlockBiotechnologies
	const [biotechActiveIndex, setBiotechActiveIndex] = useState(0);
	const [biotechSelected, setBiotechSelected] = useState(null);
	const [biotechShowDetails, setBiotechShowDetails] = useState(false);
	
	// Состояния для BlockPartition
	const [partitionSelected, setPartitionSelected] = useState(null);
	const [selectedLiveSystem, setSelectedLiveSystem] = useState(null);

	useEffect(() => {
		if(stateButton){
			const timer = setTimeout(() => {
				setActiveBlock(true);
			}, 200);

			return () => clearTimeout(timer);
		}
	}, [stateButton]);

	const handleBackButton = () => {
		if (currentView === 'biotechnologies') {
			// Если в BlockBiotechnologies открыты детали - закрываем их
			if (biotechShowDetails) {
				setBiotechShowDetails(false);
				setBiotechSelected(null);
				setBiotechActiveIndex(0);
			} else {
				// Если детали закрыты - возвращаемся к partitions
				setCurrentView('partitions');
				// Сбрасываем состояние биотехнологий
				resetBiotechState();
			}
		} else if (currentView === 'partition') {
			// Если открыта детальная информация о живой системе - возвращаемся к списку систем
			if (selectedLiveSystem) {
				setSelectedLiveSystem(null);
			} else {
				// Если открыт список систем - возвращаемся к разделам
				setCurrentView('partitions');
				setPartitionSelected(null);
			}
		}
	};

	const handleHomeButton = () => {
		setCurrentView('partitions');
		resetBiotechState();
		resetPartitionState();
	};

	const handleBiotechnologiesButton = () => {
		setCurrentView('biotechnologies');
	};

	const handlePartitionSelect = (partitionKey) => {
		setPartitionSelected(partitionKey);
		setCurrentView('partition');
		setSelectedLiveSystem(null); // Сбрасываем выбранную систему при переходе к разделу
	};

	const handleLiveSystemSelect = (liveSystem) => {
		setSelectedLiveSystem(liveSystem);
	};

	const resetBiotechState = () => {
		setBiotechActiveIndex(0);
		setBiotechSelected(null);
		setBiotechShowDetails(false);
	};

	const resetPartitionState = () => {
		setPartitionSelected(null);
		setSelectedLiveSystem(null);
	};

	// Функции для управления состоянием BlockBiotechnologies
	const handleBiotechButtonClick = (index, biotechKey) => {
		if (biotechActiveIndex === index) {
			setBiotechActiveIndex(0);
		} else {
			setBiotechActiveIndex(index);
		}
	};

	const handleBiotechLearnMore = (biotechKey) => {
		setBiotechSelected(biotechKey);
		setBiotechShowDetails(true);
	};

	return (
		<div className={`main_screen ${activeBlock ? "_active" : ''} ${hiddenStatus ? "_hidden" : ''}`}>
			<div className="menu_left">
				<button>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 61" fill="none">
							<path d="M13.2004 59.1459L9.39272 54.6459C8.84279 53.996 9.30475 53 10.1561 53H34.5914C35.3981 53 35.8728 53.906 35.4136 54.5692L32.2982 59.0692C32.1115 59.339 31.8042 59.5 31.476 59.5H13.9638C13.6696 59.5 13.3904 59.3705 13.2004 59.1459Z" stroke="white" strokeWidth="2"/>
							<rect x="1" y="1" width="43" height="52" rx="4" stroke="white" strokeWidth="2"/>
							<rect x="10" y="9" width="25" height="36" rx="1" stroke="white" strokeWidth="2"/>
							<path d="M10 24C10 24 18.2424 15 21.6364 15C23.0909 15 26 16.5 26 19C26 22 14.9998 33 10.5 38C9.27408 39.3622 11.9452 41.9804 12.4271 42.4326C12.476 42.4785 12.5264 42.5156 12.5846 42.5488C13.2073 42.9041 17.0807 45.0504 17.9998 44C21.4996 40 34.9998 24 34.9998 24" stroke="white" strokeWidth="2"/>
						</svg>
					</span>

					<span className="text">Ферментер</span>
				</button>

				<button onClick={handleBiotechnologiesButton}>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 63" fill="none">
							<path d="M28.0017 33.4947C28.0017 33.4947 28.0017 47.2079 28.0017 55.9947C28.0017 58.4947 30.046 61.4947 33.5006 61.4947C36.9551 61.4947 39.0006 58.4947 39.0006 55.9947C39.0006 47.2079 39.0006 33.4947 39.0006 33.4947M28.0017 33.4947H39.0006M28.0017 33.4947C28.0017 33.4947 26.022 32.0199 26.0003 30.4948C25.9691 28.3119 28.4901 27.9948 30.5006 27.9948M39.0006 33.4947C39.0006 33.4947 40.5006 31.8046 40.5006 30.4948C40.5006 27.9948 37.6837 27.9946 35.5006 27.9948M30.5006 27.9948C32.5 27.9947 33.5 27.9949 35.5006 27.9948M30.5006 27.9948L28 21.9946M35.5006 27.9948L37 21.9946M28 21.9946C28 21.9946 28.1177 15.8488 27 12.4946C26.0003 9.49463 21.9581 6.42169 17.5 4.32117C12.9193 2.1629 4.93363 1.64653 2.06448 1.52823C1.48732 1.50443 1.02799 1.97933 1.08083 2.55456C1.35677 5.55867 2.48054 14.1592 6.5 17.9946C9.09332 20.4692 11.9333 22.1379 15.5 22.4946C20.5 22.9946 28 21.9946 28 21.9946ZM28 21.9946C28 21.9946 24.9517 17.5006 22 15.9946C19.6795 14.8107 15.5 14.4946 15.5 14.4946M37 21.9946C37 21.9946 44.7186 23.4582 50.5 22.4946C53.5 21.9946 58.1901 19.1197 59.5 16.5C61.5115 12.477 61.2572 6.51182 61.081 4.33426C61.0417 3.84952 60.6482 3.48423 60.1621 3.47097C57.9579 3.41086 51.867 3.35071 47.5 4.32117C43 5.32117 38 8.5 37 12.4946C36.2215 15.6044 37 21.9946 37 21.9946ZM37 21.9946C37 21.9946 40.0584 17.5202 43 15.9946C44.8097 15.0561 48 14.4946 48 14.4946" stroke="white" strokeWidth="2"/>
						</svg>
					</span>

					<span className="text">Биотехнологии</span>
				</button>

				<button onClick={handleBackButton}>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 35" fill="none">
							<path d="M2 10.9991C2 10.9991 35 10.998 42 10.9991C46 10.9998 52 16.5477 52 22.4991C52 29 47.5 33.4992 44 33.4992C38 33.4992 27.5 33.4992 27.5 33.4992M2 10.9991L11 1M2 10.9991L11.5 20" stroke="white" strokeWidth="2"/>
						</svg>
					</span>

					<span className="text">Назад</span>
				</button>

				<button onClick={handleHomeButton}>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 46" fill="none">
							<path d="M2.00153 18.932C2.00084 21.1342 1.99797 31.2323 2.00167 37C2.00424 41.0064 4.50167 44.5 9.00167 44.5H24.0017H39.0017C42.5017 44.5 45.0036 40.7513 45.0036 37C45.0036 32.0848 44.6027 21.1796 44.5175 18.9162C44.5073 18.6454 44.3876 18.3979 44.1856 18.2172L25.7884 1.75479C25.605 1.59072 25.3676 1.5 25.1215 1.5H20.8933C20.6427 1.5 20.4012 1.59409 20.2167 1.76364L2.32493 18.203C2.11892 18.3923 2.00162 18.6522 2.00153 18.932Z" stroke="white" strokeWidth="2"/>
							<path d="M14 27C14 27 16.3007 30.3425 18.5 31.5C21.9558 33.3189 25.007 33.2465 28.5 31.5C30.9699 30.2651 33.5 26.5 33.5 26.5" stroke="white" strokeWidth="2"/>
						</svg>
					</span>
					
					<span className="text">Домой</span>
				</button>
			</div>

			<div className="block_main">
				<div className="block_header">
					<span className="icon_left">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 36" fill="none">
							<path d="M0 0H68C77.9411 0 86 8.05887 86 18C86 27.9411 77.9411 36 68 36H0V0Z" fill="url(#paint0_linear_631_78)"/>
							<circle cx="69" cy="18" r="13" fill="#42DAE8"/>
							<defs>
							<linearGradient id="paint0_linear_631_78" x1="0" y1="18" x2="86" y2="18" gradientUnits="userSpaceOnUse">
								<stop stopColor="#4673AC" stopOpacity="0.1"/>
								<stop offset="1" stopColor="#4673AC"/>
							</linearGradient>
							</defs>
						</svg>
					</span>

					<h2>Живые системы</h2>

					<span className="icon_right">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 69" fill="none">
							<path d="M21.2832 16.3606L9.25961 8.63118C8.81707 8.34669 8.29183 8.85077 8.55789 9.30463L15.9055 21.8387C15.9664 21.9427 15.9878 22.0653 15.9655 22.1837L14.5536 29.7142C14.5205 29.8909 14.3951 30.0362 14.2251 30.0948L1.71643 34.4081C1.23629 34.5737 1.28024 35.2667 1.77745 35.3703L11.7068 37.4389C11.8873 37.4765 12.0325 37.6104 12.0845 37.7873L14.4385 45.791C14.4777 45.9243 14.4597 46.0679 14.3888 46.1873L6.1448 60.0719C5.87197 60.5314 6.41329 61.041 6.85548 60.7409L18.7827 52.6474C18.9188 52.5551 19.0915 52.5356 19.2447 52.5952L27.7671 55.9094C27.9137 55.9664 28.025 56.0891 28.0674 56.2406L31.0781 66.9932C31.2094 67.462 31.8651 67.4858 32.03 67.0277L35.9229 56.2141C35.9719 56.0781 36.0774 55.9699 36.2121 55.9175L44.7448 52.5992C44.9038 52.5374 45.0833 52.5609 45.2211 52.6615L56.1086 60.6178C56.5441 60.9361 57.1054 60.4344 56.8378 59.9661L50.129 48.2257C50.0481 48.0842 50.0413 47.9122 50.1107 47.7648L53.9118 39.6874C53.9683 39.5674 54.0701 39.4748 54.1949 39.4298L65.0277 35.53C65.4858 35.3651 65.462 34.7094 64.9932 34.5781L54.2798 31.5783C54.1068 31.5299 53.9731 31.3924 53.9295 31.2181L52.0542 23.717C52.0197 23.5789 52.0457 23.4327 52.1256 23.3149L60.4251 11.0841C60.7142 10.658 60.2483 10.1259 59.7877 10.3561L47.717 16.3915C47.58 16.46 47.4191 16.4619 47.2805 16.3967L39.197 12.5927C39.0714 12.5336 38.976 12.4249 38.9337 12.2927L35.5081 1.58796C35.357 1.11548 34.6842 1.12783 34.5505 1.60553L31.5666 12.2623C31.5246 12.4121 31.4153 12.5339 31.2708 12.5917L21.7393 16.4043C21.5891 16.4643 21.4192 16.4481 21.2832 16.3606Z" stroke="white" strokeWidth="2"/>
							<circle cx="25.5" cy="38.5" r="5" stroke="white"/>
							<circle cx="43" cy="32" r="3.5" stroke="white"/>
							<circle cx="38.5" cy="44.5" r="3" stroke="white"/>
							<circle cx="31.5" cy="24.5" r="3" stroke="white"/>
						</svg>
					</span>
				</div>

				<div className="content">
					<BlockPartitions 
						isHidden={currentView !== 'partitions'} 
						onPartitionSelect={handlePartitionSelect}
					/>
					<BlockPartition 
						isHidden={currentView !== 'partition'} 
						partitionKey={partitionSelected}
						selectedLiveSystem={selectedLiveSystem}
						onLiveSystemSelect={handleLiveSystemSelect}
					/>
					<BlockBiotechnologies 
						isHidden={currentView !== 'biotechnologies'} 
						activeIndex={biotechActiveIndex}
						selectedBiotechnology={biotechSelected}
						showDetails={biotechShowDetails}
						onButtonClick={handleBiotechButtonClick}
						onLearnMore={handleBiotechLearnMore}
					/>
				</div>
			</div>
		</div>
	);
};