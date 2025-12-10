// app/musei/page.js
"use client";

import { useState, useEffect } from 'react';

import "./page.css";

import MuseiWidget from '../components/musei/musei_widget/MuseiWidget';
import PopupMusei from '../components/musei/popup_musei/PopupMusei';
import PopupWelcome from '../components/musei/popup_welcome/PopupWelcome';

import { usePageTitle } from '@/hooks/usePageTitle';

export default function Musei() {
    usePageTitle(
        "Экспозиция Музея Биотехнологий ПИШ ДВФУ", 
        "Интерактивная экспозиция музея биотехнологий ПИШ ДВФУ: наглядные демонстрации, уникальные экспонаты и современные биотехнологические разработки"
    );

    const [isMobile, setIsMobile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true); // Всегда показываем приветствие
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1100);
        };

        // Проверяем, отправлял ли пользователь форму ранее
        const checkFormSubmission = () => {
            const formSubmitted = localStorage.getItem('formCompleted');
            if (formSubmitted !== 'true') {
                setShowPopup(true);
            }
        };

        handleResize();
        checkFormSubmission();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFormSuccess = () => {
        setShowPopup(false);
        setShowWelcome(true);
    };

    const handleWelcomeClose = () => {
        setShowWelcome(false);
    };

    if (isMobile === null) {
        return (<div className="musei_page"></div>);
    }
    
    return (
        <div className="musei_page">
            {/* {showPopup && (
                <PopupMusei 
                    onFormSuccess={handleFormSuccess}
                />
            )} */}
            
            {showWelcome && (
                <PopupWelcome 
                    onClose={handleWelcomeClose}
                    pageType="museum"
                />
            )}
			
            <MuseiWidget isMobile={isMobile} />
        </div>
    );
}