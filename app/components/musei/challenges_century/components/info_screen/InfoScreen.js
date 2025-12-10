"use client";

import { useState, useRef } from 'react';
import './info_screen.css';
import './info_screen_media.css';


const SCENARIOS_DATA = {
    2000: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "6,114",
            averageTemperature: "0,43",
            foodDemand: "1,9",
            waterDemand: "3500",
            
            // Экономические факторы
            bioeconomyVolume: "22",
            worldEcoBiopolymers: "5",
			greenTechIndustryPenetration: "0",
            
            // Технологические факторы
            syntheticBiologyPenetration: "0",
            aiTechnologyPenetration: "0",
			alternativeFoodProducts: "0",
            
            // Социополитические факторы
            globalWarmingCommitments: "0,4",
			greenTechHouseholdPenetration: "5",
            environmentalResponsibilityAdoption: "5",
            
            // Экологические факторы
            wasteManagementMarket: "0,15",
            biofuelProduction: "250",
			plasticRecycling: "3"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "6,114",
            averageTemperature: "0,43",
            foodDemand: "1,9",
            waterDemand: "3500",
            
            // Экономические факторы
            bioeconomyVolume: "22",
            worldEcoBiopolymers: "5",
			greenTechIndustryPenetration: "0",
            
            // Технологические факторы
            syntheticBiologyPenetration: "0",
            aiTechnologyPenetration: "0",
			alternativeFoodProducts: "0",
            
            // Социополитические факторы
            globalWarmingCommitments: "0,4",
			greenTechHouseholdPenetration: "5",
            environmentalResponsibilityAdoption: "5",
            
            // Экологические факторы
            wasteManagementMarket: "0,15",
            biofuelProduction: "250",
			plasticRecycling: "3"
        },
        futurological: {
           	// Основные показатели
            numberPopulationEarth: "6,114",
            averageTemperature: "0,43",
            foodDemand: "1,9",
            waterDemand: "3500",
            
            // Экономические факторы
            bioeconomyVolume: "22",
            worldEcoBiopolymers: "5",
			greenTechIndustryPenetration: "0",
            
            // Технологические факторы
            syntheticBiologyPenetration: "0",
            aiTechnologyPenetration: "0",
			alternativeFoodProducts: "0",
            
            // Социополитические факторы
            globalWarmingCommitments: "0,4",
			greenTechHouseholdPenetration: "5",
            environmentalResponsibilityAdoption: "5",
            
            // Экологические факторы
            wasteManagementMarket: "0,15",
            biofuelProduction: "250",
			plasticRecycling: "3"
        }
    },
    2021: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "7,753",
            averageTemperature: "0,98",
            foodDemand: "2,7",
            waterDemand: "4600",
            
            // Экономические факторы
            bioeconomyVolume: "627",
            worldEcoBiopolymers: "10,7",
			greenTechIndustryPenetration: "1.5",
            
            // Технологические факторы
            syntheticBiologyPenetration: "9,5",
            aiTechnologyPenetration: "62,35",
			alternativeFoodProducts: "2",
            
            // Социополитические факторы
            globalWarmingCommitments: "1,2",
			greenTechHouseholdPenetration: "10",
			environmentalResponsibilityAdoption: "15",
            
            // Экологические факторы
            wasteManagementMarket: "2,01",
            biofuelProduction: "2750",
			plasticRecycling: "9"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "7,753",
            averageTemperature: "0,98",
            foodDemand: "2,7",
            waterDemand: "4600",
            
            // Экономические факторы
            bioeconomyVolume: "627",
            worldEcoBiopolymers: "10,7",
			greenTechIndustryPenetration: "1.5",
            
            // Технологические факторы
            syntheticBiologyPenetration: "9,5",
            aiTechnologyPenetration: "62,35",
			alternativeFoodProducts: "2",
            
            // Социополитические факторы
            globalWarmingCommitments: "1,2",
			greenTechHouseholdPenetration: "10",
			environmentalResponsibilityAdoption: "15",
            
            // Экологические факторы
            wasteManagementMarket: "2,01",
            biofuelProduction: "2750",
			plasticRecycling: "9"
        },
        futurological: {
            // Основные показатели
            numberPopulationEarth: "7,753",
            averageTemperature: "0,98",
            foodDemand: "2,7",
            waterDemand: "4600",
            
            // Экономические факторы
            bioeconomyVolume: "627",
            worldEcoBiopolymers: "10,7",
			greenTechIndustryPenetration: "1.5",
            
            // Технологические факторы
            syntheticBiologyPenetration: "9,5",
            aiTechnologyPenetration: "62,35",
			alternativeFoodProducts: "2",
            
            // Социополитические факторы
            globalWarmingCommitments: "1,2",
			greenTechHouseholdPenetration: "10",
			environmentalResponsibilityAdoption: "15",
            
            // Экологические факторы
            wasteManagementMarket: "2,01",
            biofuelProduction: "2750",
			plasticRecycling: "9"
        }
    },
	2030: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "8,55",
            averageTemperature: "1,5",
            foodDemand: "3",
            waterDemand: "5500",
            
            // Экономические факторы
            bioeconomyVolume: "1257",
            worldEcoBiopolymers: "29,7",
			greenTechIndustryPenetration: "20",
            
            // Технологические факторы
            syntheticBiologyPenetration: "30,7",
            aiTechnologyPenetration: "74",
			alternativeFoodProducts: "28",
            
            // Социополитические факторы
            globalWarmingCommitments: "1",
			greenTechHouseholdPenetration: "15",
			environmentalResponsibilityAdoption: "22",
            
            // Экологические факторы
            wasteManagementMarket: "3,16",
            biofuelProduction: "2940",
			plasticRecycling: "12"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "8,55",
            averageTemperature: "1,2",
            foodDemand: "2,9",
            waterDemand: "5000",
            
            // Экономические факторы
            bioeconomyVolume: "1885",
            worldEcoBiopolymers: "45",
			greenTechIndustryPenetration: "20",
            
            // Технологические факторы
            syntheticBiologyPenetration: "30,7",
            aiTechnologyPenetration: "82",
			alternativeFoodProducts: "20",
            
            // Социополитические факторы
            globalWarmingCommitments: "1,8",
			greenTechHouseholdPenetration: "15",
			environmentalResponsibilityAdoption: "30",
            
            // Экологические факторы
            wasteManagementMarket: "4,4",
            biofuelProduction: "9157",
			plasticRecycling: "20"
        },
        futurological: {
            // Основные показатели
            numberPopulationEarth: "8,55",
            averageTemperature: "1",
            foodDemand: "2,6",
            waterDemand: "4800",
            
            // Экономические факторы
            bioeconomyVolume: "2514",
            worldEcoBiopolymers: "45",
			greenTechIndustryPenetration: "25",
            
            // Технологические факторы
            syntheticBiologyPenetration: "38",
            aiTechnologyPenetration: "83",
			alternativeFoodProducts: "25",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,4",
			greenTechHouseholdPenetration: "25",
			environmentalResponsibilityAdoption: "47",
            
            // Экологические факторы
            wasteManagementMarket: "5,1",
            biofuelProduction: "12000",
			plasticRecycling: "30"
        }
    },
	2050: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "8,7",
            averageTemperature: "1",
            foodDemand: "3,9",
            waterDemand: "6000",
            
            // Экономические факторы
            bioeconomyVolume: "1508",
            worldEcoBiopolymers: "64",
			greenTechIndustryPenetration: "28",
            
            // Технологические факторы
            syntheticBiologyPenetration: "37,2",
            aiTechnologyPenetration: "90",
			alternativeFoodProducts: "60",
            
            // Социополитические факторы
            globalWarmingCommitments: "0,8",
			greenTechHouseholdPenetration: "25",
			environmentalResponsibilityAdoption: "30",
            
            // Экологические факторы
            wasteManagementMarket: "3,4",
            biofuelProduction: "4121",
			plasticRecycling: "20"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "9,74",
            averageTemperature: "1,5",
            foodDemand: "3,2",
            waterDemand: "4500",
            
            // Экономические факторы
            bioeconomyVolume: "3265",
            worldEcoBiopolymers: "94",
			greenTechIndustryPenetration: "40",
            
            // Технологические факторы
            syntheticBiologyPenetration: "57",
            aiTechnologyPenetration: "121",
			alternativeFoodProducts: "50",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,3",
			greenTechHouseholdPenetration: "35",
			environmentalResponsibilityAdoption: "45",
            
            // Экологические факторы
            wasteManagementMarket: "5,9",
            biofuelProduction: "15000",
			plasticRecycling: "40"
        },
        futurological: {
            // Основные показатели
            numberPopulationEarth: "10,3",
            averageTemperature: "1,2",
            foodDemand: "2,3",
            waterDemand: "4600",
            
            // Экономические факторы
            bioeconomyVolume: "6285",
            worldEcoBiopolymers: "103",
			greenTechIndustryPenetration: "50",
            
            // Технологические факторы
            syntheticBiologyPenetration: "72",
            aiTechnologyPenetration: "120",
			alternativeFoodProducts: "65",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,8",
			greenTechHouseholdPenetration: "75",
			environmentalResponsibilityAdoption: "90",
            
            // Экологические факторы
            wasteManagementMarket: "8,4",
            biofuelProduction: "25000",
			plasticRecycling: "60"
        }
    },
	2070: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "8,3",
            averageTemperature: "4,3",
            foodDemand: "4,6",
            waterDemand: "6600",
            
            // Экономические факторы
            bioeconomyVolume: "1357",
            worldEcoBiopolymers: "80",
			greenTechIndustryPenetration: "30",
            
            // Технологические факторы
            syntheticBiologyPenetration: "38",
            aiTechnologyPenetration: "93",
			alternativeFoodProducts: "65",
            
            // Социополитические факторы
            globalWarmingCommitments: "1",
			greenTechHouseholdPenetration: "25",
			environmentalResponsibilityAdoption: "30",
            
            // Экологические факторы
            wasteManagementMarket: "3,3",
            biofuelProduction: "4500",
			plasticRecycling: "40"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "10,46",
            averageTemperature: "1,6",
            foodDemand: "2,7",
            waterDemand: "4000",
            
            // Экономические факторы
            bioeconomyVolume: "3918",
            worldEcoBiopolymers: "110",
			greenTechIndustryPenetration: "50",
            
            // Технологические факторы
            syntheticBiologyPenetration: "72",
            aiTechnologyPenetration: "134",
			alternativeFoodProducts: "70",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,6",
			greenTechHouseholdPenetration: "45",
			environmentalResponsibilityAdoption: "60",
            
            // Экологические факторы
            wasteManagementMarket: "6,5",
            biofuelProduction: "18000",
			plasticRecycling: "60"
        },
        futurological: {
            // Основные показатели
            numberPopulationEarth: "12,3",
            averageTemperature: "1,15",
            foodDemand: "2",
            waterDemand: "3500",
            
            // Экономические факторы
            bioeconomyVolume: "7542",
            worldEcoBiopolymers: "108",
			greenTechIndustryPenetration: "60",
            
            // Технологические факторы
            syntheticBiologyPenetration: "81",
            aiTechnologyPenetration: "121",
			alternativeFoodProducts: "100",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,8",
			greenTechHouseholdPenetration: "75",
			environmentalResponsibilityAdoption: "100",
            
            // Экологические факторы
            wasteManagementMarket: "8,8",
            biofuelProduction: "25000",
			plasticRecycling: "80"
        }
    },
	2100: {
        conservative: {
			// Основные показатели
            numberPopulationEarth: "7,2",
            averageTemperature: "5",
            foodDemand: "4,9",
            waterDemand: "6600",
            
            // Экономические факторы
            bioeconomyVolume: "1357",
            worldEcoBiopolymers: "81",
			greenTechIndustryPenetration: "20",
            
            // Технологические факторы
            syntheticBiologyPenetration: "35",
            aiTechnologyPenetration: "81",
			alternativeFoodProducts: "65",
            
            // Социополитические факторы
            globalWarmingCommitments: "1",
			greenTechHouseholdPenetration: "15",
			environmentalResponsibilityAdoption: "22",
            
            // Экологические факторы
            wasteManagementMarket: "3,3",
            biofuelProduction: "9000",
			plasticRecycling: "50"
        },
        proactive: {
            // Основные показатели
            numberPopulationEarth: "9,74",
            averageTemperature: "1,5",
            foodDemand: "3,2",
            waterDemand: "4500",
            
            // Экономические факторы
            bioeconomyVolume: "3265",
            worldEcoBiopolymers: "94",
			greenTechIndustryPenetration: "40",
            
            // Технологические факторы
            syntheticBiologyPenetration: "57",
            aiTechnologyPenetration: "121",
			alternativeFoodProducts: "50",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,3",
			greenTechHouseholdPenetration: "35",
			environmentalResponsibilityAdoption: "45",
            
            // Экологические факторы
            wasteManagementMarket: "5,9",
            biofuelProduction: "15000",
			plasticRecycling: "40"
        },
        futurological: {
            // Основные показатели
            numberPopulationEarth: "10,3",
            averageTemperature: "1,2",
            foodDemand: "2,3",
            waterDemand: "4600",
            
            // Экономические факторы
            bioeconomyVolume: "6285",
            worldEcoBiopolymers: "103",
			greenTechIndustryPenetration: "50",
            
            // Технологические факторы
            syntheticBiologyPenetration: "72",
            aiTechnologyPenetration: "120",
			alternativeFoodProducts: "65",
            
            // Социополитические факторы
            globalWarmingCommitments: "2,8",
			greenTechHouseholdPenetration: "75",
			environmentalResponsibilityAdoption: "90",
            
            // Экологические факторы
            wasteManagementMarket: "8,4",
            biofuelProduction: "25000",
			plasticRecycling: "60"
        }
    },
};



export default function InfoScreen({ isMobile, hiddenStatus, onCloseInfoScree, activeYear = 2000 }) {
    const [currentScenario, setCurrentScenario] = useState('conservative');
    
    // Получаем данные для текущего года и сценария
    const currentData = SCENARIOS_DATA[activeYear]?.[currentScenario] || SCENARIOS_DATA[2000].conservative;

    // Состояния для всех показателей
    const [numberPopulationEarth, setNumberPopulationEarth] = useState(currentData.numberPopulationEarth);
    const [averageTemperature, setAverageTemperature] = useState(currentData.averageTemperature);
    const [foodDemand, setFoodDemand] = useState(currentData.foodDemand);
    const [waterDemand, setWaterDemand] = useState(currentData.waterDemand);
    const [bioeconomyVolume, setBioeconomyVolume] = useState(currentData.bioeconomyVolume);
    const [worldEcoBiopolymers, setWorldEcoBiopolymers] = useState(currentData.worldEcoBiopolymers);
    const [syntheticBiologyPenetration, setSyntheticBiologyPenetration] = useState(currentData.syntheticBiologyPenetration);
    const [aiTechnologyPenetration, setAiTechnologyPenetration] = useState(currentData.aiTechnologyPenetration);
    const [globalWarmingCommitments, setGlobalWarmingCommitments] = useState(currentData.globalWarmingCommitments);
    const [wasteManagementMarket, setWasteManagementMarket] = useState(currentData.wasteManagementMarket);
    const [biofuelProduction, setBiofuelProduction] = useState(currentData.biofuelProduction);
    const [greenTechIndustryPenetration, setGreenTechIndustryPenetration] = useState(currentData.greenTechIndustryPenetration);
    const [alternativeFoodProducts, setAlternativeFoodProducts] = useState(currentData.alternativeFoodProducts);
    const [greenTechHouseholdPenetration, setGreenTechHouseholdPenetration] = useState(currentData.greenTechHouseholdPenetration);
    const [environmentalResponsibilityAdoption, setEnvironmentalResponsibilityAdoption] = useState(currentData.environmentalResponsibilityAdoption);
    const [plasticRecycling, setPlasticRecycling] = useState(currentData.plasticRecycling);

    const handleScenarioChange = (scenario) => {
        setCurrentScenario(scenario);
        const newData = SCENARIOS_DATA[activeYear]?.[scenario] || SCENARIOS_DATA[2000][scenario];
        
        // Обновляем все состояния
        setNumberPopulationEarth(newData.numberPopulationEarth);
        setAverageTemperature(newData.averageTemperature);
        setFoodDemand(newData.foodDemand);
        setWaterDemand(newData.waterDemand);
        setBioeconomyVolume(newData.bioeconomyVolume);
        setWorldEcoBiopolymers(newData.worldEcoBiopolymers);
        setSyntheticBiologyPenetration(newData.syntheticBiologyPenetration);
        setAiTechnologyPenetration(newData.aiTechnologyPenetration);
        setGlobalWarmingCommitments(newData.globalWarmingCommitments);
        setWasteManagementMarket(newData.wasteManagementMarket);
        setBiofuelProduction(newData.biofuelProduction);
        setGreenTechIndustryPenetration(newData.greenTechIndustryPenetration);
        setAlternativeFoodProducts(newData.alternativeFoodProducts);
        setGreenTechHouseholdPenetration(newData.greenTechHouseholdPenetration);
        setEnvironmentalResponsibilityAdoption(newData.environmentalResponsibilityAdoption);
        setPlasticRecycling(newData.plasticRecycling);
    };



    return (
        <div className={`info_window ${hiddenStatus ? "_hidden" : ''}`}>
            <div className="block_return" onClick={onCloseInfoScree}>
                <div className="block_return__content">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 16" fill="none">
                            <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM41 8V7L1 7V8V9L41 9V8Z" fill="white"/>
                        </svg>
                    </span>

                    <h4>Вернуться</h4>
                </div>
            </div>

            <div className={`pattern ${currentScenario === 'conservative' ? 'conservative' : ''} ${currentScenario === 'proactive' ? 'proactive' : ''} ${currentScenario === 'futurological' ? 'futurological' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1047 869" fill="none">
                    <path d="M0 0V738C0 738 75 738.5 152 787C263 856.916 438.86 893.605 541 846C710.5 767 756.805 629.249 708.5 469C678.658 370 739.5 298 786.5 273C863.604 231.987 955 210 1010 157C1070.5 98.7 1036.5 0 1036.5 0H0Z" fillOpacity="0.55"/>
                    <path d="M0 0V383.678C0 383.678 45.3146 383.938 91.8375 409.153C158.903 445.501 265.157 464.576 326.869 439.826C429.28 398.755 457.257 327.14 428.072 243.828C410.041 192.359 446.802 154.927 475.199 141.93C521.785 120.608 577.006 109.177 610.236 81.6226C646.79 51.3131 626.247 0 626.247 0H0Z" fillOpacity="0.4"/>
                    <path d="M503.5 600.998C349.999 692.736 392.5 865.998 392.5 865.998C392.5 865.998 507.5 889.5 623.5 796.498C739.5 703.496 728 588.498 728 588.498C728 588.498 620.5 531.075 503.5 600.998Z" fillOpacity="0.4"/>
                </svg>
            </div>

            <div className="block_info">
                <div className="block_info__container">
                    <div className="block_general_info">
                        <div className="population_earth">
                            <h1>Население земли</h1>
                            <h1 className="number">{numberPopulationEarth} <span>млрд. чел</span></h1>
                        </div>

                        <div className="parameter">
                            <p>{averageTemperature} <span>°C</span></p>
                            <p className="description">Увеличение средней температуры</p>
                        </div>

                        <div className="parameter">
                            <p>{foodDemand} <span>млрд. тонн</span></p>
                            <p className="description">Спрос на питание</p>
                        </div>

                        <div className="parameter">
                            <p>{waterDemand} <span>км³</span></p>
                            <p className="description">Спрос на воду</p>
                        </div>
                    </div>

                    <div className="block_factors">
                        <div className="block_factor">
                            <div className="left_part">
                                <h4>Экономические факторы</h4>

                                <div className="block_progression">
                                    <h5>Уровень проникновения зеленых технологий в промышленность</h5>

                                    <div className="progression">
                                        <div className="progress_bar">
                                            <span className="progress_bar__bg"></span>
                                            <span className="progress_bar__completion" style={{ width: `${greenTechIndustryPenetration}%` }}></span>
                                        </div>

                                        <p>{greenTechIndustryPenetration}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="right_part">
                                <div className="block_statistics">
                                    <h5>{bioeconomyVolume} <span>млрд. $</span></h5>

                                    <p>Объемы биоэкономики</p>
                                </div>

                                <div className="block_statistics">
                                    <h5>{worldEcoBiopolymers} <span>млрд. $</span></h5>

                                    <p>Мировой объем эко- и биополимеров</p>
                                </div>
                            </div>
                        </div>

                        <div className="block_factor">
                            <div className="left_part">
                                <h4>Технологические факторы</h4>

                                <div className="block_progression">
                                    <h5>Альтернативные продукты питания</h5>

                                    <div className="progression">
                                        <div className="progress_bar">
                                            <span className="progress_bar__bg"></span>
                                            <span className="progress_bar__completion" style={{ width: `${alternativeFoodProducts}%` }}></span>
                                        </div>

                                        <p>{alternativeFoodProducts}% <span>от мирового рынка</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="right_part">
                                <div className="block_statistics">
                                    <h5>{syntheticBiologyPenetration} <span>млрд. $</span></h5>

                                    <p>Объемы проникновения синтетической биологии в другие сферы</p>
                                </div>

                                <div className="block_statistics">
                                    <h5>{aiTechnologyPenetration} <span>млрд. $</span></h5>

                                    <p>Проникновние технологий искусственного интеллекта</p>
                                </div>
                            </div>
                        </div>

                        <div className="block_factor">
                            <div className="left_part">
                                <h4>Социополитические факторы</h4>

                                <div className="block_progression">
                                    <h5>Уровень проникновения зеленых технологий в быт</h5>

                                    <div className="progression">
                                        <div className="progress_bar">
                                            <span className="progress_bar__bg"></span>
                                            <span className="progress_bar__completion" style={{ width: `${greenTechHouseholdPenetration}%` }}></span>
                                        </div>

                                        <p>{greenTechHouseholdPenetration}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="right_part">
                                <div className="block_statistics">
                                    <h5>{globalWarmingCommitments} <span>°C</span></h5>

                                    <p>Мировые обязательства по борьбе с глобальным потеплением</p>
                                </div>

                                <div className="block_progression">
                                    <h5>Принятие обществом принципов экологической ответсвенности</h5>

                                    <div className="progression">
                                        <div className="progress_bar">
                                            <span className="progress_bar__bg"></span>
                                            <span className="progress_bar__completion" style={{ width: `${environmentalResponsibilityAdoption}%` }}></span>
                                        </div>

                                        <p>{environmentalResponsibilityAdoption}% <span>населения</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="block_factor">
                            <div className="left_part">
                                <h4>Экономические факторы</h4>

                                <div className="block_progression">
                                    <h5>Вторичная переработка пластика</h5>

                                    <div className="progression">
                                        <div className="progress_bar">
                                            <span className="progress_bar__bg"></span>
                                            <span className="progress_bar__completion" style={{ width: `${plasticRecycling}%` }}></span>
                                        </div>

                                        <p>{plasticRecycling}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="right_part">
                                <div className="block_statistics">
                                    <h5>{wasteManagementMarket} <span>млрд. тонн</span></h5>

                                    <p>Объем мирового рынка управления отходами</p>
                                </div>

                                <div className="block_statistics">
                                    <h5>{biofuelProduction} <span>тыс. барр./день</span></h5>

                                    <p>Биотопливо</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

			{activeYear !== 2000 && activeYear !== 2021 && (
				<div className="block_switches">
					<span>Выберите сценарий:</span>

					<div 
						className={`block_switch ${currentScenario === 'conservative' ? '_active' : ''}`}
						onClick={() => handleScenarioChange('conservative')}
					>
						<div className="block_text">
							<h2>01</h2>
							<h4>Консервативный</h4>
							<p>Общество, промышленность и сельское хозяйство существуют в привычном формате</p>
						</div>

						<div className="arrow">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 24" fill="none">
								<path d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9393L92.5147 1.3934C91.9289 0.807612 90.9792 0.807612 90.3934 1.3934C89.8076 1.97918 89.8076 2.92893 90.3934 3.51472L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM0 12V13.5H101V12V10.5H0V12Z" fill="white"/>
							</svg>
						</div>

						<div className="block_animation"></div>
					</div>

					<div 
						className={`block_switch ${currentScenario === 'proactive' ? '_active' : ''}`}
						onClick={() => handleScenarioChange('proactive')}
					>
						<div className="block_text">
							<h2>02</h2>
							<h4>Проактивный</h4>
							<p>Каждый осуществит свой посильный вклад в экономику</p>
						</div>

						<div className="arrow">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 24" fill="none">
								<path d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9393L92.5147 1.3934C91.9289 0.807612 90.9792 0.807612 90.3934 1.3934C89.8076 1.97918 89.8076 2.92893 90.3934 3.51472L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM0 12V13.5H101V12V10.5H0V12Z" fill="white"/>
							</svg>
						</div>

						<div className="block_animation"></div>
					</div>

					<div 
						className={`block_switch ${currentScenario === 'futurological' ? '_active' : ''}`}
						onClick={() => handleScenarioChange('futurological')}
					>
						<div className="block_text">
							<h2>03</h2>
							<h4>Футурологический</h4>
							<p>Если все технологии можно будет внедрить в жизнь</p>
						</div>

						<div className="arrow">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 24" fill="none">
								<path d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9393L92.5147 1.3934C91.9289 0.807612 90.9792 0.807612 90.3934 1.3934C89.8076 1.97918 89.8076 2.92893 90.3934 3.51472L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM0 12V13.5H101V12V10.5H0V12Z" fill="white"/>
							</svg>
						</div>

						<div className="block_animation"></div>
					</div>
				</div>
			)}
        </div>
    );
}