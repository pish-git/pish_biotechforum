"use client";

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Image from "next/image";

import './section_info_musei.css';
import './section_info_musei_media.css';

import StandardButton from '../../main_page/standard_button/StandardButton';



export default function SectionInfoMusei({ isMobile }) {
	return (
		<>
			{isMobile ? (
				<section className="info_musei mobile">
					<h1>Добро пожаловать в будущее</h1>

					<div className="block_info_opening">
						<div className="content">
							<h4>18 октября 2024 года</h4>

							<div className="block_text">
								<p>
									В день Биотехнолога состоялось открытие <span>Музея современных биотехнологий</span> Передовой инженерной 
									школы ДВФУ. Инсталляции музея созданы совместно с ФИЦ биотехнологии РАН. Музей представляет 
									собой экспозиционное пространство биотехнологическихи биоинженерных инсталляционных моделей.
								</p>

								<p>
									<span>Предназначение музея</span> – популяризация биоинженерии среди молодежи Дальнего Востока и Сибири.
								</p>
							</div>
						</div>
					</div>

					<div className="block_facts">
						<div className="block_content">
							<div className="block_text">
								<p>
									Музей, созданный при научно-методическом участии Федерального исследовательского 
									центра <span>«Фундаментальные основы биотехнологии»</span> Российской академии наук (ФИЦ Биотехнологии РАН), 
									представляет собой уникальное экспозиционное пространство, демонстрирующее модели 
									биотехнологических и биоинженерных разработок.
								</p>

								<p>
									<span>Основная цель музея</span> – популяризация достижений биоинженерии и биотехнологий среди молодежи 
									Дальнего Востока и Сибири.
								</p>
							</div>
						</div>

						<div className="block_content">
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet="/img/about_us/info_musei/frame_3_mobile.webp" type="image/webp" />
									<source srcSet="/img/about_us/info_musei/frame_3_mobile.png" type="image/png" />
									<Image 
										src="/img/about_us/info_musei/frame_3_mobile.png" 
										alt="" 
										fill
										unoptimized={true}
										objectFit='contain'
										objectPosition='top'
									/>
								</picture>
						</div>
					</div>

					<div className="block_button">
						<StandardButton text="Посетить" type="standard" />
					</div>
				</section>
			) : (
				<section className="info_musei main">
					<h1>Добро пожаловать в будущее</h1>

					<div className="block_info_opening">
						<div className="content">
							<h4>18 октября 2024 года</h4>

							<div className="block_text">
								<p>
									В день Биотехнолога состоялось открытие <span>Музея современных биотехнологий</span> Передовой инженерной 
									школы ДВФУ. Инсталляции музея созданы совместно с ФИЦ биотехнологии РАН. Музей представляет 
									собой экспозиционное пространство биотехнологическихи биоинженерных инсталляционных моделей.
								</p>

								<p>
									<span>Предназначение музея</span> – популяризация биоинженерии среди молодежи Дальнего Востока и Сибири.
								</p>
							</div>
						</div>
					</div>

					<div className="block_facts">
						<div className="container">
							<div className="block_content">
								<div className="block_text">
									<p>
										Музей, созданный при научно-методическом участии Федерального исследовательского 
										центра <span>«Фундаментальные основы биотехнологии»</span> Российской академии наук (ФИЦ Биотехнологии РАН), 
										представляет собой уникальное экспозиционное пространство, демонстрирующее модели 
										биотехнологических и биоинженерных разработок.
									</p>

									<p>
										<span>Основная цель музея</span> – популяризация достижений биоинженерии и биотехнологий среди молодежи 
										Дальнего Востока и Сибири.
									</p>
								</div>
							</div>

							<div className="block_content">
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet="/img/about_us/info_musei/frame_3.webp" type="image/webp" />
									<source srcSet="/img/about_us/info_musei/frame_3.png" type="image/png" />
									<Image 
										src="/img/about_us/info_musei/frame_3.png" 
										alt="" 
										fill
										unoptimized={true}
										objectFit='contain'
										objectPosition='top'
									/>
								</picture>
							</div>
						</div>
					</div>

					<div className="block_button">
						<StandardButton text="Посетить" type="standard" />
					</div>
				</section>
			)}
		</>
	);
}