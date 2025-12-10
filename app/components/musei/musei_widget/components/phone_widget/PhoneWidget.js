'use client';

import { useState, useRef, useEffect } from 'react';

import Image from "next/image";
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import './phone_widget.css';
import './phone_widget_media.css';

import './slide_1.css';
import './slide_2.css';
import './slide_3.css';
import './slide_4.css';
import './slide_5.css';
import './slide_6.css';
import './slide_7.css';

import ControllerWidgets from '../controller_widgets/ControllerWidgets';



export default function PhoneWidget({ isMobile }) {
const swiperRef = useRef(null);
	const videoRefs = useRef([]);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [showTip, setShowTip] = useState(true);

	const [openWidget, setOpenWidget] = useState(false);
	const [idOpenedWidget, setIdOpenedWidget] = useState("");

	const handleOpenWidget = (open, id) => {
		if(open){
			setOpenWidget(true);
			setIdOpenedWidget(id);
		} else{
			setOpenWidget(false);
			setIdOpenedWidget("");
		}
	};

	// Обработчик клика по кнопкам управления
	const handleControlsClick = (direction) => {
		if (!hasInteracted) {
			setShowTip(false);
			
			setTimeout(() => {
				setHasInteracted(true);
			}, 500);
		}
		
		// Выполняем навигацию
		if (direction === 'prev') {
			swiperRef.current?.slidePrev();
		} else {
			swiperRef.current?.slideNext();
		}
	};

	// Функция для обработки изменения слайда
	const handleSlideChange = (swiper) => {
		setActiveSlideIndex(swiper.realIndex);
		
		// Останавливаем все видео кроме активного
		videoRefs.current.forEach((video, index) => {
			if (video) {
				if (index === swiper.realIndex) {
					// Запускаем активное видео
					video.play().catch(error => {
						console.log('Автовоспроизведение не разрешено:', error);
					});
				} else {
					// Останавливаем неактивные видео и сбрасываем позицию
					video.pause();
				}
			}
		});
	};

	// Инициализация видео при монтировании
	useEffect(() => {
		// Предзагрузка всех видео
		videoRefs.current.forEach(video => {
			if (video) {
				video.preload = 'auto';
				video.load();
			}
		});

		// Запуск первого видео если он активен
		if (videoRefs.current[0]) {
			videoRefs.current[0].play().catch(error => {
				console.log('Автовоспроизведение не разрешено:', error);
			});
		}

		return () => {
			// Очистка при размонтировании
			videoRefs.current.forEach(video => {
				if (video) {
					video.pause();
					video.src = '';
				}
			});
		};
	}, []);

	return (
		<div className="block_phone">
			<div className="block_phone__container">
				<div className="block_swiper">
					<Swiper
						modules={[Navigation]}
						spaceBetween={0}
						slidesPerView={1}
						loop={true}
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
						}}
						onSlideChange={handleSlideChange}
						initialSlide={activeSlideIndex}
					>
						<SwiperSlide data-slide="1">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_1.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[0] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_1.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 0 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "medicine")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="2">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_2.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[1] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_2.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 1 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "fermenter")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="3">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_3.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[2] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_3.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 3 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									{/* <button onClick={() => handleOpenWidget(true, "widget_in_dev")}></button> */}
									<button onClick={() => handleOpenWidget(true, "zaa_restoration")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="4">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_4.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[3] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_4.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 4 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "challenges_century")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="5">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_5.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[4] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_5.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 5 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "genes")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="6">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_6.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[5] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_6.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 6 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "aquabio")}></button>
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide data-slide="7">
							<div className="slide__content">
								<div className="slide_video_container">
									<img src="/img/musei/phone/video_bg_7.jpg" alt="logo of the advanced engineering school" />

									<video
										ref={el => videoRefs.current[6] = el}
										src={"https://s3.twcstorage.ru/e6b9f60a-42dc8220-bab7-406e-a09c-8252246c303b/pish_video/musei/phone_musei/video_7.mp4"}
										preload="auto"
										muted
										playsInline
										loop
										className={activeSlideIndex === 7 ? 'video-active' : 'video-inactive'}
									/>
								</div>

								<div className="block_exhibit">
									<button onClick={() => handleOpenWidget(true, "bacteria_guard_ecology")}></button>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				{!hasInteracted && (
					<div className={`block_tip ${showTip ? '' : '_hidden'}`}>
						<p>Для того чтобы начать, выберите экспонат и нажмите на него</p>
					</div>
				)}

				<div className="block_controls">
					<button onClick={() => handleControlsClick('prev')}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 24" fill="none">
							<path d="M12.5 23L2 12.5L12.5 1" stroke="white" strokeWidth="2"/>
						</svg>
					</button>

					<button onClick={() => handleControlsClick('next')}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 24" fill="none">
							<path d="M1 1L11.5 11.5L1 23" stroke="white" strokeWidth="2"/>
						</svg>
					</button>
				</div>
			</div>

			<Link href="/" className="button_exit">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 73" fill="none">
					<line x1="4.06066" y1="1.93934" x2="74.0607" y2="71.9393" stroke="white" strokeWidth="3"/>
					<line x1="1.93934" y1="71.9393" x2="71.9393" y2="1.93934" stroke="white" strokeWidth="3"/>
				</svg>
			</Link>

			<ControllerWidgets openWidget={openWidget} idOpenedWidget={idOpenedWidget} funForCloseWidget={handleOpenWidget} isMobile={isMobile} />
		</div>
	);
}