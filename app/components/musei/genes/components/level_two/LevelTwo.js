"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import './level_two.css';
import './level_two_media.css';

import imgPattern from '../../img/level_2/pattern.png';
import imgPatternWebp from '../../img/level_2/pattern.webp';

import imgRnk from '../../img/level_1/rnk.png';
import imgRnkWebp from '../../img/level_1/rnk.webp';

// Список правильных комбинаций нот на основе таблицы amino_acids
const correctCombinations = [
  { notes: "gcu", aminoAcid: "Ala" },
  { notes: "uuc", aminoAcid: "Phe" },
  { notes: "auu", aminoAcid: "Ile" },
  { notes: "aaa", aminoAcid: "Lys" },
  { notes: "ugu", aminoAcid: "Cys" },
  { notes: "guu", aminoAcid: "Val" },
  { notes: "ggc", aminoAcid: "Gly" },
  { notes: "ugc", aminoAcid: "Trp" },
  { notes: "uau", aminoAcid: "Tyr" },
  { notes: "cau", aminoAcid: "His" },
  { notes: "gaa", aminoAcid: "Glu" },
  { notes: "cgu", aminoAcid: "Arg" },
  { notes: "gau", aminoAcid: "Asp" },
  { notes: "cuu", aminoAcid: "Leo" },
  { notes: "ucc", aminoAcid: "Ser" },
  { notes: "acu", aminoAcid: "Thr" },
  { notes: "aau", aminoAcid: "Asy" },
  { notes: "aug", aminoAcid: "Met" },
  { notes: "uau", aminoAcid: "Tyr" },
  { notes: "ccu", aminoAcid: "Pro" }
];

export default function LevelTwo({ funForCloseWidget, hiddenStatus }) {
	const [levelHidden, setLevelHidden] = useState(true);
	const [offset, setOffset] = useState(0);
	const [activeNotes, setActiveNotes] = useState(["g", "a", "u"]); // Начальные активные ноты
	const [animationStarted, setAnimationStarted] = useState(false); // Флаг начала анимации
	const [showResult, setShowResult] = useState(false); // Показывать ли результат
	const [isCorrect, setIsCorrect] = useState(false); // Правильный ли ответ
	const [aminoAcidText, setAminoAcidText] = useState(""); // Текст для amino acid
	const [showInfo, setShowInfo] = useState(true); // Показывать ли подсказку block_info
	
	// Задержки в виде состояний для легкой настройки
	const [normalDelay, setNormalDelay] = useState(2000); // Обычная задержка между смещениями
	const [clickDelay, setClickDelay] = useState(3000); // Задержка после клика пользователя
	const [resultDisplayTime, setResultDisplayTime] = useState(2000); // Время показа результата

	const intervalRef = useRef(null);
	const shiftDistanceRef = useRef(62); // Значение по умолчанию
	
	// Типы нот по порядку (можно легко менять количество и порядок)
	const noteTypes = ["g", "a", "u", "c", "a", "g", "c", "c", "g", "u", "a", "c", "u", "g", "a", "c", "u"];
	const notesCount = noteTypes.length; // Автоматически рассчитываем количество элементов

	useEffect(() => {
		// Получаем значение смещения из CSS переменной
		const rootStyles = getComputedStyle(document.documentElement);
		const shiftValue = rootStyles.getPropertyValue('--note-shift-distance').trim();
		if (shiftValue) {
			shiftDistanceRef.current = parseInt(shiftValue);
		}
	}, []);

	useEffect(() => {
		if (!hiddenStatus) {
			setTimeout(() => {
				setLevelHidden(false);
			}, 50);
		} else {
			setLevelHidden(true);
			// Останавливаем анимацию когда уровень скрывается
			stopAnimation();
			// Сбрасываем смещение при скрытии
			setOffset(0);
			setActiveNotes(["g", "a", "u"]); // Сбрасываем активные ноты
			setAnimationStarted(false); // Сбрасываем флаг начала анимации
			setShowResult(false); // Скрываем результат
			setShowInfo(true); // Показываем подсказку при сбросе
		}

		// Очистка при размонтировании компонента
		return () => {
			stopAnimation();
		};
	}, [hiddenStatus]);

	// Функция для проверки комбинации нот
	const checkCombination = (notesString) => {
		const foundCombination = correctCombinations.find(comb => comb.notes === notesString);
		
		if (foundCombination) {
			setIsCorrect(true);
			setAminoAcidText(foundCombination.aminoAcid);
		} else {
			setIsCorrect(false);
		}
	};

	// Функция для скрытия результата через заданное время
	const hideResultAfterDelay = () => {
		setTimeout(() => {
			setShowResult(false);
		}, resultDisplayTime);
	};

	// Функция для обработки клика по block_click
	const handleBlockClick = () => {
        const currentNotesString = activeNotes.join('');
        
        if (!animationStarted) {
            // Первый клик - начинаем анимацию и показываем первый результат с задержкой
            console.log("Активные ноты:", currentNotesString);
            checkCombination(currentNotesString);
            
            // Сначала скрываем подсказку
            setShowInfo(false);
            
            // Показываем результат с небольшой задержкой после скрытия подсказки
            setTimeout(() => {
                setShowResult(true);
                hideResultAfterDelay();
            }, 300); // Задержка 300ms для плавного перехода
            
            setAnimationStarted(true);
            startAnimation(clickDelay); // Первое смещение через увеличенную задержку
        } else {
            // Последующие клики - проверяем комбинацию и показываем результат
            console.log("Активные ноты:", currentNotesString);
            checkCombination(currentNotesString);
            setShowResult(true);
            hideResultAfterDelay();
            
            // Увеличиваем задержку до следующего смещения
            restartAnimationWithDelay();
        }
    };

	// Функция для перезапуска анимации с увеличенной задержкой
	const restartAnimationWithDelay = () => {
		stopAnimation();
		setTimeout(() => {
			startAnimation(normalDelay); // Возвращаем обычную задержку после показа результата
		}, resultDisplayTime); // Ждем время показа результата
	};

	// Функция для обновления активных нот
	const updateActiveNotes = (currentOffset) => {
		const remainingNotes = notesCount - currentOffset;
		
		if (remainingNotes >= 3) {
			// Есть 3 или больше нот - берем следующие 3
			const newActiveNotes = [
				noteTypes[currentOffset],
				noteTypes[currentOffset + 1],
				noteTypes[currentOffset + 2]
			];
			setActiveNotes(newActiveNotes);
		} else if (remainingNotes === 2) {
			// Осталось 2 ноты - быстро смещаем обе
			console.log("Осталось 2 ноты - быстрое финальное смещение");
			setActiveNotes([]);
			
			// Останавливаем обычный интервал и делаем быстрое финальное смещение
			stopAnimation();
			
			// Быстро смещаем еще два раза без задержки
			setTimeout(() => {
				setOffset(prev => prev + 1);
				setTimeout(() => {
					setOffset(prev => prev + 1);
				}, 100); // Минимальная задержка между смещениями
			}, 100);
		} else {
			// Меньше 2 нот - завершаем
			setActiveNotes([]);
			stopAnimation();
		}
	};

	const startAnimation = (delay = normalDelay) => {
		stopAnimation(); // Останавливаем предыдущую анимацию если была
		intervalRef.current = setInterval(() => {
			setOffset(prevOffset => {
				const newOffset = prevOffset + 1;
				
				// Обновляем активные ноты
				updateActiveNotes(newOffset);
				
				// Увеличиваем смещение на 1, но не больше чем количество элементов
				if (newOffset <= notesCount) {
					return newOffset;
				} else {
					// Останавливаем анимацию когда все элементы сместились
					stopAnimation();
					return prevOffset;
				}
			});
		}, delay); // Используем переданную задержку
	};

	const stopAnimation = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Функция для определения видимости каждого элемента
	const getNoteStyle = (index) => {
		const translateX = -offset * shiftDistanceRef.current; // Смещение для всех элементов
    
		// Элемент получает opacity: 0 только если offset больше чем его индекс + 1
		// (то есть когда следующий элемент уже сместился)
		const opacity = offset > index + 1 ? 0 : 1;
    
		return { 
			transform: `translateX(${translateX}px)`,
			opacity: opacity
		};
	};

	return (
		<div className={`level_two ${levelHidden ? '_hidden' : ''}`}>
            <div className="amino_acids_info">
                <h3>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 41" fill="none">
                            <path d="M20.6339 22.0001L10.6339 16.5L1 22.5L1.13395 34.5001L10.6339 39.5L20.6339 34.5001V22.0001ZM20.6339 22.0001L26.1339 19.5M26.1339 19.5L31.6339 22.5L36.6339 19.5V13.5L31.6339 10L26.1339 13M26.1339 19.5V13M26.1339 13L20.1339 10.5M20.1339 10.5V4L14.6339 1L9.63395 4V10.5L14.6339 13L20.1339 10.5Z" stroke="#AAF189"/>
                        </svg>
                    </span>

                    <span className="text">20 базовых аминокислот</span>
                </h3>

                <div className="table_amino_acids">
                    <div className="row">
                        <div className="amino_acid">
                            <span>Ala</span>
                            <span>gcu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Phe</span>
                            <span>uuc</span>
                        </div>

                        <div className="amino_acid">
                            <span>ile</span>
                            <span>auu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Lys</span>
                            <span>aaa</span>
                        </div>

                        <div className="amino_acid">
                            <span>Cys</span>
                            <span>ugu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Val</span>
                            <span>guu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Gly</span>
                            <span>ggc</span>
                        </div>

                        <div className="amino_acid">
                            <span>Trp</span>
                            <span>ugc</span>
                        </div>

                        <div className="amino_acid">
                            <span>Tyr</span>
                            <span>uau</span>
                        </div>

                        <div className="amino_acid">
                            <span>His</span>
                            <span>cau</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="amino_acid">
                            <span>Glu</span>
                            <span>gaa</span>
                        </div>

                        <div className="amino_acid">
                            <span>Arg</span>
                            <span>cgu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Asp</span>
                            <span>gau</span>
                        </div>

                        <div className="amino_acid">
                            <span>Leo</span>
                            <span>cuu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Ser</span>
                            <span>ucc</span>
                        </div>

                        <div className="amino_acid">
                            <span>Thr</span>
                            <span>acu</span>
                        </div>

                        <div className="amino_acid">
                            <span>Asy</span>
                            <span>aau</span>
                        </div>

                        <div className="amino_acid">
                            <span>Met</span>
                            <span>aug</span>
                        </div>

                        <div className="amino_acid">
                            <span>Tyr</span>
                            <span>uau</span>
                        </div>

                        <div className="amino_acid">
                            <span>Pro</span>
                            <span>ccu</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block_game">
                <div className="block_rkn_notes">
                    {noteTypes.map((noteType, index) => (
                        <div 
                            key={index}
                            className={`rnk_note _${noteType}_note`} 
                            style={getNoteStyle(index)}
                        ></div>
                    ))}
                </div>

                <div className={`block_click ${!animationStarted ? '_pulsing' : ''}`} onClick={handleBlockClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182 168" fill="none">
                        <rect x="7" width="169" height="164" fill="url(#paint1_linear_809_202)"/>
                        <path d="M3 150C3 150 4.5 165.5 16 165.5C68.5 165.5 106.055 165.5 166 165.5C179.5 165.5 179.5 150 179.5 150" stroke="url(#paint0_linear_809_202)" strokeWidth="5"/>
                        <defs>
                            <linearGradient id="paint0_linear_809_202" x1="3" y1="157.75" x2="179.5" y2="157.75" gradientUnits="userSpaceOnUse">
                                <stop stopColor="white"/>
                                <stop offset="1" stopColor="#4695E2"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_809_202" x1="91.5" y1="0" x2="91.5" y2="164" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stopOpacity="0"/>
                                <stop offset="1" stopColor="white" stopOpacity="0.2"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className={`block_result ${showResult ? '_visible' : ''}`}>
                    {isCorrect ? (
                        <p className="amino_acid">{aminoAcidText}</p>
                    ) : (
                        <div className="error">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                <rect x="2.08984" y="0.324219" width="24.4527" height="2.9557" rx="1.47785" transform="rotate(45 2.08984 0.324219)" fill="#DF5497"/>
                                <rect y="17.6147" width="24.4527" height="2.9557" rx="1.47785" transform="rotate(-45 0 17.6147)" fill="#DF5497"/>
                            </svg>
                        </div>
                    )}
                </div>

                <div className={`block_info ${showInfo ? '_visible' : ''}`}>
                    <p>Объединяйте нуклеотиды по три, не допуская пропусков и наложений между кодонами, составляя правильную комбинацию</p>
                    <p>Для этого нажимайте на подсвечивающийся элемент в нужный момент</p>
                </div>
            </div>

            <div className="block_pattern">
                <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                    <source srcSet={imgPatternWebp.src} type="image/webp" />
                    <source srcSet={imgPattern.src} type="image/jpeg" />
                    <Image 
                        src={imgPattern} 
                        alt="" 
                        fill
                        unoptimized={true}
                        objectFit='cover'
                    />
                </picture>
            </div>

            <div className="block_rnk">
                <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                    <source srcSet={imgRnkWebp.src} type="image/webp" />
                    <source srcSet={imgRnk.src} type="image/jpeg" />
                    <Image 
                        src={imgRnk} 
                        alt="" 
                        fill
                        unoptimized={true}
                        objectFit='cover'
                    />
                </picture>
            </div>
		</div>
	);
}