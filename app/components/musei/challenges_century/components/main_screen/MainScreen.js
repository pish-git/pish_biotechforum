"use client";

import { useRef } from 'react';
import './main_screen.css';
import './main_screen_media.css';



export default function MainScreen({ isMobile, hiddenStatus, onOpenInfoScreen, activeYear, setActiveYear }) {
	const swiperRef = useRef(null);

	const handleYearClick = (year) => {
		setActiveYear(year);

		setTimeout(() => {
			onOpenInfoScreen();
		}, 300);
	};


	
	return (
		<div className={`main_window ${hiddenStatus ? "_hidden" : ''}`}>
			<div className="block_header">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="176" height="26" viewBox="0 0 176 26" fill="none">
						<path d="M0 0H166C171.523 0 176 4.47715 176 10V16C176 21.5228 171.523 26 166 26H0V0Z" fill="url(#paint0_linear_247_33)"/>
						<circle cx="164" cy="13" r="9" fill="#727AFF"/>
						<defs>
							<linearGradient id="paint0_linear_247_33" x1="0" y1="13" x2="176" y2="13" gradientUnits="userSpaceOnUse">
								<stop offset="0.2" stopColor="#4E529E" stopOpacity="0.1"/>
								<stop offset="1" stopColor="#4E529E"/>
							</linearGradient>
						</defs>
					</svg>
				</span>

				<h4>Как биоэкономика изменит мир</h4>
			</div>

			<div className="block_chronology">
				<div 
					className={`block_year ${activeYear === 2000 ? '_active' : ''}`}
					onClick={() => handleYearClick(2000)}
				>
					<p>2000 <span>год</span></p>
				</div>

				<div 
					className={`block_year ${activeYear === 2021 ? '_active' : ''}`}
					onClick={() => handleYearClick(2021)}
				>
					<p>2021 <span>год</span></p>
				</div>

				<div 
					className={`block_year ${activeYear === 2030 ? '_active' : ''}`}
					onClick={() => handleYearClick(2030)}
				>
					<p>2030 <span>год</span></p>
				</div>

				<div 
					className={`block_year ${activeYear === 2050 ? '_active' : ''}`}
					onClick={() => handleYearClick(2050)}
				>
					<p>2050 <span>год</span></p>
				</div>

				<div 
					className={`block_year ${activeYear === 2070 ? '_active' : ''}`}
					onClick={() => handleYearClick(2070)}
				>
					<p>2070 <span>год</span></p>
				</div>

				<div 
					className={`block_year ${activeYear === 2100 ? '_active' : ''}`}
					onClick={() => handleYearClick(2100)}
				>
					<p>2100 <span>год</span></p>
				</div>
			</div>
		</div>
	);
}