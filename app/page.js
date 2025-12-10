"use client";

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Image from "next/image";

import "./page.css";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import SectionHome from './components/main_page/sections/section_home/SectionHome';
import SectionAboutMuseum from './components/main_page/sections/section_about_museum/SectionAboutMuseum';
import SectionHeroesPish from './components/main_page/sections/section_heroes_pish/SectionHeroesPish';
import SectionAboutPish from './components/main_page/sections/section_about_pish/SectionAboutPish';
import SectionInfo from './components/main_page/sections/section_info/SectionInfo';

import { usePageTitle } from '@/hooks/usePageTitle';



export default function Home() {
	usePageTitle(
		"Фестиваль Биотех Профессий - ПИШ ДВФУ", 
		"Передовая инженерная школа ДВФУ: инновации в биоинженерии, достижения биоинженеров Дальнего востока и интерактивный музей биотехнологий"
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
        return (<div className="app"></div>);
    }

	return (
		<div className="app">
			<Header isMobile={isMobile} />
			
			<main>
				<SectionHome isMobile={isMobile} />

				<SectionAboutMuseum isMobile={isMobile} />

				<SectionHeroesPish isMobile={isMobile} />

				<SectionAboutPish isMobile={isMobile} />

				<SectionInfo isMobile={isMobile} />
			</main>

			<Footer isMobile={isMobile} patternsActive={true} />
		</div>
	);
}