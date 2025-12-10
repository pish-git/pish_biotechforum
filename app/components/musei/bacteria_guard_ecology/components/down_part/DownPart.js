"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import './down_part.css';
import './down_part_media.css';

import imgInfo from '../../img/img_info.png';

import slideImg1 from '../../img/slider_img/1.png';
import slideImg2 from '../../img/slider_img/2.png';
import slideImg3 from '../../img/slider_img/3.png';
import slideImg4 from '../../img/slider_img/4.png';
import slideImg5 from '../../img/slider_img/5.png';
import slideImg6 from '../../img/slider_img/6.png';
import slideImg7 from '../../img/slider_img/7.png';
import slideImg8 from '../../img/slider_img/8.png';
import slideImg9 from '../../img/slider_img/9.png';
import slideImg10 from '../../img/slider_img/10.png';
import slideImg11 from '../../img/slider_img/11.png';
import slideImg12 from '../../img/slider_img/12.png';

import SlideComponent from './SlideComponent';

const SLIDES_DATA_1 = [
    { id: "dizelnoe-toplivo", image: slideImg1, text: "Дизельное \n топливо" },
    { id: "karton", image: slideImg2, text: "Картон" },
    { id: "ovoshnaya-kozhura", image: slideImg3, text: "Овощная \n кожура" },
    { id: "sadovyi-shlang", image: slideImg4, text: "Садовый \n шланг" },
    { id: "ptichi-perya", image: slideImg5, text: "Птичьи \n перья" },
    { id: "kraski-dlya-derevev", image: slideImg6, text: "Краски \n для деревьев" },
];

const SLIDES_DATA_2 = [
    { id: "emal-dlya-metalla", image: slideImg7, text: "Эмаль \n для металла" },
    { id: "bumaga", image: slideImg8, text: "Бумага" },
    { id: "polietilenovyi-paket", image: slideImg9, text: "Полиэтиленовый \n пакет" },
    { id: "zaplesnevelyi-hleb", image: slideImg10, text: "Заплесневелый \n хлеб" },
    { id: "navoz", image: slideImg11, text: "Навоз" },
    { id: "neft", image: slideImg12, text: "Нефть" },
];

const WelcomeBlock = ({ className = '' }) => (
    <div className={`block_welcome ${className}`}>
        <p>Очистите пролив <br/> с помощью бактерий</p>
    </div>
);

import imgIconWin from '../../img/icon_win.png';

const CompleteVictoryBlock = ({ className = '' }) => (
    <div className={`block_complete_victory ${className}`}>
        <div className="block_icon">
            <div className="icon_container">
                <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                    <source srcSet={imgIconWin.src} type="image/webp" />
                    <source srcSet={imgIconWin.src} type="image/jpeg" />
                    <Image 
                        className="bg_illustration" 
                        src={imgIconWin} 
                        alt="" 
                        fill
                        unoptimized={true}
                        objectFit='cover'
                    />
                </picture>
            </div>
        </div>

        <div className="block_text">
            <h1>Победа!</h1>
            <p>Благодаря вам бактерии полностью очистили <br/> окружающую среду от отходов</p>
        </div>
    </div>
);

const ConfirmationBlock = ({ onConfirm }) => (
    <div className="block_confirmations">
        <h4>Подтвердить выбор?</h4>
        
        <button onClick={onConfirm}>
            <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 22" fill="none">
                    <g filter="url(#filter0_d_572_32)">
                    <path d="M3 9L11.2929 17.2929C11.6834 17.6834 12.3166 17.6834 12.7071 17.2929L28 2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_572_32" x="0.5" y="0.5" width="30" height="20.5859" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_572_32"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_572_32" result="shape"/>
                    </filter>
                    </defs>
                </svg>
            </span>
            <span className="text">Да</span>
        </button>

        <p>Чтобы выбрать другую пару отходов - покрутите комбинации слева и справа</p>
    </div>
);

const InfoBlock = () => (
    <div className="block_info">
        <span className="icon"></span>
        <p>Подберите правильную пару отходов <br/> для бактерий. Используйте свайп вверх <br/> или вниз в левой и правой подборках</p>
        <img src={imgInfo.src} alt=""></img>
    </div>
);

const ResultBlock = ({ isCorrect }) => (
    <>
        {isCorrect ? (
            <div className="block_result victory">
                <h4>Отлично!</h4>
                <p>Выберите другую бактерию, чтобы продолжить очистку окружающей среды</p>
            </div>
        ) : (
            <div className="block_result lost">
                <h4>Неверно!</h4>
                <p>Вы неверно подобрали отходы для бактерии. Попробуйте снова или выберите другую бактерию</p>
            </div>
        )}
    </>
);

const SelectionBlock = ({ isSwiped, onSlideChange, className = '', onConfirm, answerResult }) => {
    const [currentBlock, setCurrentBlock] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const renderCenterBlock = () => {
        if (answerResult !== null) {
            return <ResultBlock isCorrect={answerResult} />;
        } else if (isSwiped) {
            return <ConfirmationBlock onConfirm={onConfirm} />;
        } else {
            return <InfoBlock />;
        }
    };

    useEffect(() => {
        if (currentBlock === null) {
            setCurrentBlock(renderCenterBlock());
        } else {
            setIsVisible(false);
            
            setTimeout(() => {
                setCurrentBlock(renderCenterBlock());
                setIsVisible(true);
            }, 300);
        }
    }, [answerResult, isSwiped]);

    return (
        <div className={`block_selection ${className}`}>
            <SlideComponent 
                slides={SLIDES_DATA_1} 
                onSlideChange={onSlideChange}
                sliderId="slider1"
            />

            <div 
                className="center_block"
                style={{
                    opacity: isVisible ? 1 : 0,
                }}
            >
                {currentBlock}
            </div>

            <SlideComponent 
                slides={SLIDES_DATA_2} 
                onSlideChange={onSlideChange}
                sliderId="slider2"
            />
        </div>
    );
};

export default function DownPart({ selectedBacteria, onCheckAnswer, bacteriaVictoryState }) {
    const [currentDownPart, setCurrentDownPart] = useState({
        id: 0,
        content: "welcome",
        show: true
    });
    const [nextDownPart, setNextDownPart] = useState(null);
    const [isSwiped, setIsSwiped] = useState(false);
    const [answerResult, setAnswerResult] = useState(null);

    const currentSlidesRef = useRef({
        slider1: null,
        slider2: null
    });
    const initialSlidesState = useRef(JSON.stringify(currentSlidesRef.current));
    const hasTrackedInitialization = useRef(false);
    const selectedBacteriaRef = useRef(selectedBacteria);
    const previousSlidesState = useRef(JSON.stringify(currentSlidesRef.current));

    const isCompleteVictory = bacteriaVictoryState && 
        Object.values(bacteriaVictoryState).filter(Boolean).length === 5;

    const handleSlideChange = (sliderId, slideId) => {
        currentSlidesRef.current[sliderId] = slideId;
        
        const currentState = JSON.stringify(currentSlidesRef.current);
        
        if (currentState !== previousSlidesState.current) {
            if (answerResult !== null) {
                setAnswerResult(null);
            }
            
            previousSlidesState.current = currentState;
        }
        
        if (hasTrackedInitialization.current) {
            if (currentState !== initialSlidesState.current && !isSwiped) {
                setIsSwiped(true);
            }
        }
    };

    const handleConfirm = () => {
        if (onCheckAnswer && currentSlidesRef.current.slider1 && currentSlidesRef.current.slider2) {
            const result = onCheckAnswer(currentSlidesRef.current.slider1, currentSlidesRef.current.slider2);
            setAnswerResult(result);
        }
    };

    useEffect(() => {
        if (currentSlidesRef.current.slider1 !== null && currentSlidesRef.current.slider2 !== null) {
            const timer = setTimeout(() => {
                initialSlidesState.current = JSON.stringify(currentSlidesRef.current);
                previousSlidesState.current = JSON.stringify(currentSlidesRef.current);
                hasTrackedInitialization.current = true;
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [currentSlidesRef.current.slider1, currentSlidesRef.current.slider2]);

    useEffect(() => {
        if (selectedBacteria !== null && selectedBacteriaRef.current !== selectedBacteria) {
            setIsSwiped(false);
            setAnswerResult(null);
            hasTrackedInitialization.current = false;
            currentSlidesRef.current = {
                slider1: null,
                slider2: null
            };
            initialSlidesState.current = JSON.stringify(currentSlidesRef.current);
            previousSlidesState.current = JSON.stringify(currentSlidesRef.current);
        }
        selectedBacteriaRef.current = selectedBacteria;
    }, [selectedBacteria]);

    useEffect(() => {
        if (selectedBacteria === null) {
            setIsSwiped(false);
            setAnswerResult(null);
            hasTrackedInitialization.current = false;
            currentSlidesRef.current = {
                slider1: null,
                slider2: null
            };
        }
    }, [selectedBacteria]);

    useEffect(() => {
        if (isCompleteVictory) {
            const newDownPartId = currentDownPart.id + 1;
            
            setNextDownPart({
                id: newDownPartId,
                content: "complete_victory",
                show: false
            });
            
            setTimeout(() => {
                setNextDownPart(prev => prev ? { ...prev, show: true } : null);
            }, 50);
            
            setTimeout(() => {
                setCurrentDownPart({
                    id: newDownPartId,
                    content: "complete_victory",
                    show: true
                });
                setNextDownPart(null);
            }, 550);
        } else if (selectedBacteria !== null) {
            const newDownPartId = currentDownPart.id + 1;
            
            setNextDownPart({
                id: newDownPartId,
                content: "selection",
                show: false
            });
            
            setTimeout(() => {
                setNextDownPart(prev => prev ? { ...prev, show: true } : null);
            }, 50);
            
            setTimeout(() => {
                setCurrentDownPart({
                    id: newDownPartId,
                    content: "selection",
                    show: true
                });
                setNextDownPart(null);
            }, 550);
        }
    }, [selectedBacteria, isCompleteVictory]);

    useEffect(() => {
        if (selectedBacteria === null && currentDownPart.id > 0 && !isCompleteVictory) {
            const newDownPartId = currentDownPart.id + 1;
            
            setNextDownPart({
                id: newDownPartId,
                content: "welcome",
                show: false
            });
            
            setTimeout(() => {
                setNextDownPart(prev => prev ? { ...prev, show: true } : null);
            }, 50);
            
            setTimeout(() => {
                setCurrentDownPart({
                    id: newDownPartId,
                    content: "welcome",
                    show: true
                });
                setNextDownPart(null);
            }, 550);
            
            currentSlidesRef.current = {
                slider1: null,
                slider2: null
            };
        }
    }, [selectedBacteria, isCompleteVictory]);
    
    return (
        <div className="down_part">
            {currentDownPart.content === "welcome" && (
                <WelcomeBlock 
                    key={currentDownPart.id} 
                    className={nextDownPart ? '_hidden' : ''}
                />
            )}
            
            {currentDownPart.content === "selection" && (
                <SelectionBlock 
                    key={currentDownPart.id}
                    isSwiped={isSwiped}
                    onSlideChange={handleSlideChange}
                    onConfirm={handleConfirm}
                    answerResult={answerResult}
                    className={nextDownPart ? '_hidden' : ''}
                />
            )}

            {currentDownPart.content === "complete_victory" && (
                <CompleteVictoryBlock 
                    key={currentDownPart.id} 
                    className={nextDownPart ? '_hidden' : ''}
                />
            )}

            {nextDownPart && nextDownPart.content === "welcome" && (
                <WelcomeBlock 
                    key={nextDownPart.id} 
                    className={nextDownPart.show ? '' : '_hide'}
                />
            )}
            
            {nextDownPart && nextDownPart.content === "selection" && (
                <SelectionBlock 
                    key={nextDownPart.id}
                    isSwiped={isSwiped}
                    onSlideChange={handleSlideChange}
                    onConfirm={handleConfirm}
                    answerResult={answerResult}
                    className={nextDownPart.show ? '' : '_hide'}
                />
            )}

            {nextDownPart && nextDownPart.content === "complete_victory" && (
                <CompleteVictoryBlock 
                    key={nextDownPart.id} 
                    className={nextDownPart.show ? '' : '_hide'}
                />
            )}
        </div>
    );
}