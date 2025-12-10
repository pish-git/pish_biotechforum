"use client";

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import "./page.css";
import "./page_media.css";

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import SectionInfoMusei from '../components/about_us/section_info_musei/SectionInfoMusei';
import SectionAdvantages from '../components/about_us/section_advantages/SectionAdvantages';

import { usePageTitle } from '@/hooks/usePageTitle';



export default function AboutUs() {
	usePageTitle(
		"О Нас - Интерактивный Музей Биотехнологий ПИШ ДВФУ", 
  		"Единственный на Дальнем Востоке интерактивный музей биотехнологий ПИШ ДВФУ. Уникальные экспонаты, региональные проекты и наглядные демонстрации инноваций"
	);



	const [isMobile, setIsMobile] = useState(null);
	
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1100);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);



	if (isMobile === null) {
		return null;
	}

	return (
		<div className="page_about_us">
			<div className="page_bg">
				<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
					<source srcSet="/img/about_us/bg.webp" type="image/webp" />
					<source srcSet="/img/about_us/bg.png" type="image/jpeg" />
					<Image 
						src="/img/about_us/bg.png" 
						alt="" 
						fill
						unoptimized={true}
						objectFit='cover'
					/>
				</picture>
			</div>

			<Header isMobile={isMobile} />

			<main>
				<SectionInfoMusei isMobile={isMobile} />

				<SectionAdvantages isMobile={isMobile} />
			</main>

			<Footer isMobile={isMobile} patternsActive={true} />
		</div>
	);
}