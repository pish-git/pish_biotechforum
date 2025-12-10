"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import './block_biotechnologies.css';
import './block_biotechnologies_media.css';

import blockImg1Webp from '../../img/block_biotechnologies/img1.webp';
import blockImg1Png from '../../img/block_biotechnologies/img1.png';

// Данные о биотехнологиях
const biotechnologiesData = {
    "microscopic_pharmacy": {
        title: "Микроскопическая аптека",
        description: "Микробиологические технологии играют ключевую роль в современной медицине и фармацевтике. Этот раздел охватывает производство ликарственных средств, вакцин, ферментов и других терапевтических препаратов с помощью микроогранизмов. К примеру, бактерии и грибы используются для синтеза антибиотиков, таких как пенициллин и стрептомицин. Важнейшими направлениями так же явдяются биотехнологическое производство инсулина и других гормонов, получаемых с использованием рекомбинативных ДНК-технологий. Микробиологические методы позволяют производить биоактивные соединения в промышленных масштабах, снижая затраты и повышая эффективность лечения. Этот раздел, иногда называемый 'микроскопической аптекой', является неотъемлемой частью современной фармацевтической промышленности и направлен на разработку новыъ методов лечения болезней, от инфекций до онкологических заболеваний."
    },
    "prehistoric_biotechnologies": {
        title: "Доисторические биотехнологии",
        description: "Доисторические биотехнологии - это ранние формы использования микроогранизмов человеком, зародившиеся тысячи лет назад. Одними из первых таких технологий стали процессы брожения и закваски. Люди использовали дикие дрожжи и бактерии для приготовления хлеба, вина, сыра и других продуктов задолго до того, как были изучены сами микроорганизмы. Брожение позволяло сохранять пищу и придавать ей новые свойства, такие как вкус, текстура и устойчивость к порче. Эти древние методы считаются основой биотехнологий, из которых позже развились современные процессы ферментации и получения биопродуктов. Доисторитические биотехнологии показали, как человечество интуитивно использовало силы природы задолго до появления микроскопов и лабораторий."
    },
    "edible_biotechnologies": {
        title: "Cъедобные биотехнологии",
        description: "Съедобные биотехнологии включают в себя использование биологических процессов и организмов для производства и улучшения продуктов питания. Современные технологии ферментации позволяют создавать пробиотические продукты, функциональные добавки и биомолекулы, способствующие здоровью. В этом разделе также активно развиваются альтернативные источники пищи, такие как искусственное мясо, культивируемое в лабораториях, и белковые продукты на основе микроводорослей. Использование микроорганизмов, таких как дрожжи и бактерии, для создания съедобных продуктов помогает решать проблемы продовольственной безопасности и уменьшает нагрузку на окружающую среду. Съедобные биотехнологии стали ответом на растущий спрос на экологически чистую и полезную пищу, предлагая инновационные решения в области производства продуктов питания."
    },
    "biotechnologies_and_earth_bowels": {
        title: "Биотехнологии и земные недра",
        description: "Этот раздел охватывает применение биотехнологий в горнодобывающей промышленности и управлении природными ресурсами. Микроорганизмы используются для биодобычи металлов, таких как золото, медь и уран, из руд и отвалов. Процессы биолечения, основанные на активности бактерий, способны извлекать металлы из трудноразрабатываемых залежей, минимизируя при этом экологический ущерб. Важное значение также имеют технологии биоремедиации — очистки загрязненных земель с использованием микроорганизмов, способных разлагать нефтепродукты, тяжелые металлы и другие загрязнители. Биотехнологии, работающие с земными недрами, позволяют не только добывать ресурсы более экологически безопасным способом, но и восстанавливать загрязненные участки, что критически важно в условиях глобальных экологических вызовов."
    },
    "air_water_soil_purification": {
        title: "Очистка воздуха, воды и почвы",
        description: "Биотехнологии активно используются для очистки окружающей среды. Микроорганизмы и растения играют ключевую роль в биоремедиации — процессах, направленных на разложение и удаление загрязняющих веществ из почвы, воды и воздуха. Вода очищается от токсинов и патогенов с помощью биофильтров, содержащих специальные бактерии. Почвы, загрязненные тяжелыми металлами и органическими загрязнителями, восстанавливаются с помощью микробных и фитобиотехнологий. Воздух очищается от летучих органических соединений и паров с помощью биологических систем. Эти технологии применяются как на промышленных объектах, так и в городских средах, обеспечивая безопасные условия для жизни. Биотехнологии очистки являются неотъемлемой частью экологического менеджмента и играют важную роль в сохранении природных ресурсов."
    },
    "look_into_future": {
        title: "Взгляд в будущее",
        description: "Этот раздел посвящен перспективам биотехнологий и их возможному влиянию на наше будущее. В центре внимания находятся новейшие разработки в генной инженерии, синтетической биологии и создании биопродуктов. Редактирование генома, такие как CRISPR, обещает революционные изменения в лечении генетических заболеваний, создании устойчивых к болезням сельскохозяйственных культур и разработке новых видов биоматериалов. Синтетическая биология открывает возможности создания полностью новых организмов и биосистем с заданными функциями. Взгляд в будущее также охватывает биопродукты, такие как биополимеры, которые могут заменить традиционные материалы и уменьшить экологический след. В этом разделе биотехнологии рассматриваются как ключ к решению глобальных проблем и трансформации общества, включая здравоохранение, сельское хозяйство и промышленность."
    }
};

export default function BlockBiotechnologies({ 
    isHidden, 
    activeIndex, 
    selectedBiotechnology, 
    showDetails, 
    onButtonClick, 
    onLearnMore 
}) {
    // Получаем данные о выбранной биотехнологии
    const selectedBiotechData = selectedBiotechnology ? biotechnologiesData[selectedBiotechnology] : null;

    return (
        <div className={`block_biotechnologies ${isHidden ? '_hidden' : ''}`}>
           <div className={`block_selection_biotechnologies ${showDetails ? '_hidden' : ''}`}>
                <div className="block_img">
                    <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                        <source srcSet={blockImg1Webp.src} type="image/webp" />
                        <source srcSet={blockImg1Png.src} type="image/jpeg" />
                        <Image 
                            src={blockImg1Png} 
                            alt="" 
                            fill
                            unoptimized={true}
                            objectFit='cover'
                        />
                    </picture>
                </div>

                <div className="block_selection">
                    <div className={`button_selection ${activeIndex === 0 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(0, 'microscopic_pharmacy')}>
                            <span className="text">Микроскопическая аптека</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Огромный раздел микроскопических технологий - это получение лекарств и других фармацевтических субстанций.</p>

                            <span className="learn_more" onClick={() => onLearnMore('microscopic_pharmacy')}>Узнать больше</span>
                        </div>
                    </div>

                    <div className={`button_selection ${activeIndex === 1 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(1, 'prehistoric_biotechnologies')}>
                            <span className="text">Доисторические биотехнологии</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Простейшие биотехнологии, возникшие задолго до современной науки, включают в себя методы брожения, сыроварения и закваски, использовавшиеся древними культурами.</p>

                            <span className="learn_more" onClick={() => onLearnMore('prehistoric_biotechnologies')}>Узнать больше</span>
                        </div>
                    </div>

                    <div className={`button_selection ${activeIndex === 2 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(2, 'edible_biotechnologies')}>
                            <span className="text">Cъедобные биотехнологии</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Раздел биотехнологий, связанный с производством пищевых продуктов, таких как ферментированные продукты, исскуственное мясо и функциональные добавки.</p>

                            <span className="learn_more" onClick={() => onLearnMore('edible_biotechnologies')}>Узнать больше</span>
                        </div>
                    </div>

                    <div className={`button_selection ${activeIndex === 3 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(3, 'biotechnologies_and_earth_bowels')}>
                            <span className="text">Биотехнологии и земные недра</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Использование микроогранизмов для добычи полезных ископаемых, биодобычи металлов и рекомендации загрязненных почв.</p>

                            <span className="learn_more" onClick={() => onLearnMore('biotechnologies_and_earth_bowels')}>Узнать больше</span>
                        </div>
                    </div>

                    <div className={`button_selection ${activeIndex === 4 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(4, 'air_water_soil_purification')}>
                            <span className="text">Очистка воздуха, воды и почвы</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Применение биотехнологий для биоремедиации - процессов, направленных на устранение загрязнителей и восстановление экологической чистоты окружающей среды.</p>

                            <span className="learn_more" onClick={() => onLearnMore('air_water_soil_purification')}>Узнать больше</span>
                        </div>
                    </div>

                    <div className={`button_selection ${activeIndex === 5 ? '_active' : ''}`}>
                        <button onClick={() => onButtonClick(5, 'look_into_future')}>
                            <span className="text">Взгляд в будущее</span>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 2V23M2 12.7442H23" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>

                        <div className="block_info">
                            <p>Разработка прорывных биотехнологий, таких как генная инженерия, синтетическая биология и биопродукты будущего, которые изменят жизнь людей и окружающую среду.</p>

                            <span className="learn_more" onClick={() => onLearnMore('look_into_future')}>Узнать больше</span>
                        </div>
                    </div>
                </div>

                <div className="block_hint">
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 42" fill="none">
                            <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807614 11.0711 0.807613 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM12 42L13.5 42L13.5 2L12 2L10.5 2L10.5 42L12 42Z"/>
                        </svg>
                    </span>

                    <p>Выберите биотехнологию, чтобы <br /> узнать о ней больше</p>
                </div>
            </div>

            <div className={`block_info_biotechnology ${!showDetails ? '_hidden' : ''}`}>
                {selectedBiotechData && (
                    <div className="content">
                        <div className="block_header">
                            <span className="text">{selectedBiotechData.title}</span>
                        </div>

                        <div className="block_info">
                            <p>{selectedBiotechData.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};