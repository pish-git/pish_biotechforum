"use client";

import { useState } from 'react';
import Image from "next/image";

import './tutorial_part.css';
import './tutorial_part_media.css';

import imgDnk from '../../img/level_1/dnk.png';
import imgDnkWebp from '../../img/level_1/dnk.webp';

// Данные для блоков объяснений
const tutorialData = [
    {
        title: "ДНК и геном человека",
        explanations: [
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                <path d="M17.5001 58C17.5001 60.5 13.0001 60.5 13.0001 58C13.0001 53 13.1429 47.3327 13.0001 40.5C12.8899 35.2255 12.6582 25.8932 12.5001 27C12.0001 30.5 12 34.5 11.5 36.5C11 38.5 8.4982 38.5004 8.00012 36.5C7.62663 35 8.66679 25.5 9.50012 23C10.5925 19.7228 13.0001 17.0001 15.0001 17L20.5001 17C22.4527 17 25 19.5 26 23C26.8687 26.0406 28.0001 34 28.0001 36.5C28.0001 38 25 38.5 24.5 36.5C24 34.5 23.5001 31.5 23.0001 27C22.8767 25.8888 23.0001 35.228 23.0001 40.5V58C23.0001 60.5 18.5001 60.5 18.5001 58V40.5C18.5001 39.3285 17.5001 39.3285 17.5001 40.5V58Z" fill="white"/>
                <circle cx="17.75" cy="10.75" r="4.75" fill="white"/>
            </svg>
            ),
            text: "Молекула ДНК человека содержит информацию <br> о геноме. Он определяет, как функционирует <br> и развивается наш организм"
        },
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                <rect x="12" y="13" width="11" height="1" fill="white"/>
                <rect x="12" y="17" width="11" height="1" fill="white"/>
                <rect x="12" y="21" width="11" height="1" fill="white"/>
                <rect x="12" y="40" width="11" height="1" fill="white"/>
                <rect x="12" y="44" width="11" height="1" fill="white"/>
                <rect x="12" y="48" width="11" height="1" fill="white"/>
                <path d="M11.168 58C11.168 58 11.1628 44.1733 12.1693 40.5C14.3093 32.69 20.0472 31.1621 22.668 23.5C24.8314 17.1751 24.668 6.5 24.668 6.5" stroke="white" strokeWidth="4"/>
                <path d="M24.6719 58C24.6719 58 24.6771 44.1733 23.6706 40.5C21.5306 32.69 15.7926 31.1621 13.1719 23.5C11.0085 17.1751 11.1719 6.5 11.1719 6.5" stroke="white" strokeWidth="4"/>
            </svg>
            ),
            text: "Информация в ДНК представлена в виде кода, <br> шифрующего белки. Этот код можно сравнить <br> с огромной библиотекой, где храняться ноты всех <br> мелодий мира"
        }
        ]
    },
    {
        title: "Ген",
        explanations: [
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                <rect x="12" y="13" width="11" height="1" fill="white"/>
                <rect x="12" y="17" width="11" height="1" fill="white"/>
                <rect x="12" y="21" width="11" height="1" fill="white"/>
                <rect x="12" y="40" width="11" height="1" fill="white"/>
                <rect x="12" y="44" width="11" height="1" fill="white"/>
                <rect x="12" y="48" width="11" height="1" fill="white"/>
                <path d="M11.168 58C11.168 58 11.1628 44.1733 12.1693 40.5C14.3093 32.69 20.0472 31.1621 22.668 23.5C24.8314 17.1751 24.668 6.5 24.668 6.5" stroke="white" strokeWidth="4"/>
                <path d="M24.6719 58C24.6719 58 24.6771 44.1733 23.6706 40.5C21.5306 32.69 15.7926 31.1621 13.1719 23.5C11.0085 17.1751 11.1719 6.5 11.1719 6.5" stroke="white" strokeWidth="4"/>
            </svg>
            ),
            text: "Гены - это участки ДНК или нотная запись одной <br> мелодии. Чтобы воспроизвести эту мелодию, <br> необходимо сделать копию ее нотной записи <br> из библиотеки"
        },
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                <rect x="12" y="13" width="11" height="1" fill="white"/>
                <rect x="12" y="17" width="11" height="1" fill="white"/>
                <rect x="12" y="21" width="11" height="1" fill="white"/>
                <rect x="12" y="40" width="11" height="1" fill="white"/>
                <rect x="12" y="44" width="11" height="1" fill="white"/>
                <rect x="12" y="48" width="11" height="1" fill="white"/>
                <path d="M24.6719 58C24.6719 58 24.6771 44.1733 23.6706 40.5C21.5306 32.69 15.7926 31.1621 13.1719 23.5C11.0085 17.1751 11.1719 6.5 11.1719 6.5" stroke="white" strokeWidth="4"/>
            </svg>
            ),
            text: "Ноты одной мелодии называются РНК. <br> РНК содержит информацию о структуре белков"
        }
        ]
    },
    {
        title: "4 ноты РНК",
        explanations: [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                    <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                    <rect x="12" y="13" width="11" height="1" fill="white"/>
                    <rect x="12" y="17" width="11" height="1" fill="white"/>
                    <rect x="12" y="21" width="11" height="1" fill="white"/>
                    <rect x="12" y="40" width="11" height="1" fill="white"/>
                    <rect x="12" y="44" width="11" height="1" fill="white"/>
                    <rect x="12" y="48" width="11" height="1" fill="white"/>
                    <path d="M24.6719 58C24.6719 58 24.6771 44.1733 23.6706 40.5C21.5306 32.69 15.7926 31.1621 13.1719 23.5C11.0085 17.1751 11.1719 6.5 11.1719 6.5" stroke="white" strokeWidth="4"/>
                </svg>
            ),
            text: "Существует 4 ноты для записи РНК. Эти ноты <br> называются нуклеотидами. Их обозначают <br> буквами G, T, A, C"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                    <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                    <path d="M7.91249 37.1215C7.58767 37.8055 8.7046 42.4967 9.38048 42.8101C10.2868 43.2305 14.3528 40.9431 14.6713 40.2562L25.8214 16.2156L19.0625 13.0808C19.0625 13.0808 10.3748 31.9366 7.91249 37.1215Z" fill="white"/>
                    <rect x="22.1016" y="6" width="7.78166" height="5.80136" rx="1" transform="rotate(24.88 22.1016 6)" fill="white"/>
                    <rect x="7.23828" y="46.6077" width="19.8678" height="2.48348" fill="white"/>
                    <rect x="7.23828" y="51.5747" width="19.8678" height="2.48348" fill="white"/>
                    <rect x="7.23828" y="56.542" width="19.8678" height="2.48348" fill="white"/>
                </svg>
            ),
            text: "Нуклеотиды необходимо правильно переписать, <br> чтобы верно воспроизвести мелодию. Так мелодия <br> копируется из ДНК в РКН"
        }
        ]
    },
    {
        title: "Правила записи",
        explanations: [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                    <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                    <path d="M21.5957 20C22.4327 20 23.8616 22.2701 23.8662 22.8379C23.8991 27.0494 23.8928 30.2175 23.8662 33.623C23.861 34.191 22.1588 35.8936 21.5957 35.8936H11.9463C11.3789 35.8945 10.8542 38.4669 10.2441 38.1641C7.9695 37.029 4.00086 34.7584 4 33.623C4 31.3526 4.00241 24.5407 4 22.8379C3.99897 21.9892 5.69828 20.0002 6.83789 20C11.3742 20.0001 18.753 20 21.5957 20ZM6.26367 26.8115V31.3525H21.0215V26.8115H6.26367Z" fill="white"/>
                    <path d="M30.1221 26.8113C31.2616 26.8115 32.9608 28.8004 32.96 29.6492C32.9576 31.352 32.96 38.1639 32.96 40.4343C32.9594 41.5696 28.9905 43.8402 26.7158 44.9753C26.1057 45.2784 25.581 42.7058 25.0137 42.7048H15.3643C14.8012 42.7048 13.0987 41.0022 13.0938 40.4343C13.0839 39.1748 13.0776 37.9475 13.0742 36.6882H23.9258C24.2016 36.688 24.4256 36.4641 24.4258 36.1882V26.8113C26.4636 26.8113 28.4793 26.8113 30.1221 26.8113Z" fill="white"/>
                </svg>
            ),
            text: "Запись мелодии в РНК происходит по особым <br> правилам. Ноты - нуклеотиды из ДНК дешифруются <br> или переводяться на понятный РНК язык"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 66" fill="none">
                    <rect x="0.5" y="0.5" width="35" height="65" rx="6.5" stroke="white"/>
                    <path d="M13.0781 24.7415C13.0781 24.7415 18.6477 29.8063 19.1559 29.8063C19.6624 29.8063 24.2207 25.2479 24.2207 25.2479" stroke="white" strokeWidth="2"/>
                    <path d="M13.0781 30.3127C13.0781 30.3127 18.6477 35.3776 19.1559 35.3776C19.6624 35.3776 24.2207 30.8192 24.2207 30.8192" stroke="white" strokeWidth="2"/>
                    <circle cx="17.13" cy="18.1571" r="4.05186" fill="white"/>
                    <path d="M19.6519 16.131C19.6519 16.131 19.3452 5.8536 19.6391 6.00158C20.6548 6.51312 25.217 11.0663 25.2232 11.5727C25.2402 12.9572 25.2232 15.1181 25.2232 15.1181" stroke="white" strokeWidth="2"/>
                    <circle cx="11.0519" cy="52.5978" r="4.05186" fill="white"/>
                    <path d="M14.0898 52.598V40.4424M25.7389 55.1304V51.0785M25.7389 51.0785C25.7389 51.0785 25.7389 48.9177 25.7389 47.5331C25.7389 47.0267 14.0898 35.8841 14.0898 36.3905C14.0898 38.4164 14.0898 40.4424 14.0898 40.4424M25.7389 51.0785L14.0898 40.4424" stroke="white" strokeWidth="2"/>
                    <circle cx="23.2081" cy="56.6498" r="4.05186" fill="white"/>
                </svg>
            ),
            text: "Так, нота A преобразуется в U, нота T становится A, <br> а ноты C и G заменяют друг друга."
        }
        ]
    }
];



export default function TutorialPart({ onMainPartShow }) {
    const [tutorialHidden, setTutorialHidden] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [animationState, setAnimationState] = useState('idle'); // 'idle', 'exiting', 'entering'

    const handleNextClick = () => {
        if (animationState !== 'idle') return;
        
        if (currentStep < tutorialData.length - 1) {
            // Анимация выхода
            setAnimationState('exiting');
            
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setAnimationState('entering');
                
                setTimeout(() => {
                setAnimationState('idle');
                }, 600);
            }, 500);
        } else {
            // Последний шаг - скрываем tutorial и вызываем функцию для открытия MainPart
            setTutorialHidden(true);
            setTimeout(() => {
                if (onMainPartShow) onMainPartShow();
            }, 300);
        }
    };

    const getAnimationClass = (elementType, index = 0) => {
        if (animationState === 'idle') return '';
        
        if (animationState === 'exiting') {
            if (elementType === 'title') return 'title-exiting';
            if (elementType === 'explanation') return `explanation-exiting ${index === 1 ? 'explanation-delayed' : ''}`;
        }
        
        if (animationState === 'entering') {
            if (elementType === 'title') return 'title-entering';
            if (elementType === 'explanation') return `explanation-entering ${index === 1 ? 'explanation-delayed' : ''}`;
        }
        
        return '';
    };

    return (
        <div className={`tutorial_part ${tutorialHidden ? '_hidden' : ''}`}>
            <div className="block_tutorial_info">
                <div className="title-container">
                    <h1 className={`title ${getAnimationClass('title')}`}>
                        {tutorialData[currentStep]?.title}
                    </h1>
                </div>

                <div className="block_explanations">
                    {tutorialData[currentStep]?.explanations?.map((explanation, index) => (
                        <div 
                            key={index}
                            className={`block_explanation ${getAnimationClass('explanation', index)}`}
                        >
                            <span className="icon">
                            {   explanation.icon}
                            </span>
                            <p 
                                className="text"
                                dangerouslySetInnerHTML={{ __html: explanation.text }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="block_button_switch">
                <button onClick={handleNextClick}>
                    <span className="text">
                        {currentStep < tutorialData.length - 1 ? 'Далее' : 'Начать'}
                    </span>
                </button>
            </div>

            <div className="block_img_gen">
                <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                    <source srcSet={imgDnkWebp.src} type="image/webp" />
                    <source srcSet={imgDnk.src} type="image/jpeg" />
                    <Image 
                        src={imgDnk} 
                        alt="" 
                        fill
                        unoptimized={true}
                        objectFit='cover'
                        objectPosition='center -50px'
                    />
                </picture>
            </div>
        </div>
    );
}