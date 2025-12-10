import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Image from "next/image";

import './section_heroes_pish.css';
import './section_heroes_pish_media.css';

import StandardButton from '../../standard_button/StandardButton';

import PopupHero from '../../popup_hero/PopupHero';
// import PopupBioengineerBlocked from './popup_bioengineer_blocked/PopupBioengineerBlocked';



export default function SectionHeroesPish({ isMobile }) {
	const [popupHeroShow, setPopupHeroShow] = useState(false);
	const [popupHeroOpen, setPopupHeroOpen] = useState(false);
	const [popupIdHero, setPopupIdHero] = useState(1);
	const [popupVideoUrl, setPopupVideoUrl] = useState("");

	// const [popupBioengineerShow, setPopupBioengineerShow] = useState(false);

	const handlePopupOpen = (open, id) => {
		if(open){
			let videoUrl = "";
			switch(id) {
				case 1:
					videoUrl = "https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/pish_heroes/video_1.mp4";
					break;
				case 2:
					videoUrl = "https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/pish_heroes/video_2.mp4";
					break;
				case 3:
					videoUrl = "https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/pish_heroes/video_3.mp4";
					break;
				default:
					videoUrl = "https://s3.twcstorage.ru/e89c3020-2d77e7ca-e868-4d3a-992d-70ee90c24707/pish_video/pish_heroes/video_1.mp4";
			}
			
			setPopupVideoUrl(videoUrl);
			setPopupHeroShow(true);
			setPopupIdHero(id);

			setTimeout(() => {
				setPopupHeroOpen(true);
			}, 50);
		} else{
			setPopupHeroOpen(false);

			setTimeout(() => {
				setPopupHeroShow(false);
			}, 310);
		}
	};

	// const handleBioengineerPopupOpen = () => {
	// 	setPopupBioengineerShow(true);
	// };

	// const handleBioengineerPopupClose = () => {
	// 	setPopupBioengineerShow(false);
	// };



	return (
		<>
			{isMobile ? (
				<section className="heroes_pish mobile">
					<h1><span>Биоинженеры дальнего</span></h1>

					<div className="section_content">
						<div className="block_hero">
							<div className="block_info">
								<span className="fio">Сидоренко Андрей Владимирович</span>
								<span className="description">Главный механик производства «Кормбиосинтез».</span>

								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 1)} />
							</div>

							<div className="block_img">
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet="/img/main/heroes_pish/photo_1_mobile.webp" type="image/webp" />
									<source srcSet="/img/main/heroes_pish/photo_1_mobile.jpg" type="image/jpeg" />
									<Image 
										src="/img/main/heroes_pish/photo_1_mobile.jpg" 
										alt="Портрет Штермер Ванессы" 
										fill
										unoptimized={true}
									/>
								</picture>
							</div>
						</div>

						<div className="block_hero _reverse">
							<div className="block_img">
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet="/img/main/heroes_pish/photo_2_mobile.webp" type="image/webp" />
									<source srcSet="/img/main/heroes_pish/photo_2_mobile.jpg" type="image/jpeg" />
									<Image 
										src="/img/main/heroes_pish/photo_2_mobile.jpg" 
										alt="Портрет Штермер Ванессы" 
										fill
										unoptimized={true}
									/>
								</picture>
							</div>

							<div className="block_info">
								<span className="fio">Рочин Егор Олегович</span>
								<span className="description">
									Ведущий технолог НГПК <span>«Арника»</span>, специализирующейся на производстве биодобавок 
									для сельскохозяйственной отрасли.
								</span>

								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 2)} />
							</div>
						</div>

						<div className="block_hero">
							<div className="block_info">
								<span className="fio">Штермер Ванесса</span>
								<span className="description">Лаборант-исследователь молодёжной лаборатории ДНК-рекомбинантных технологий ПИШ, студентка 4 курса направления «Биотехнология»</span>

								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 3)} />
							</div>

							<div className="block_img">
								<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
									<source srcSet="/img/main/heroes_pish/photo_3_mobile.webp" type="image/webp" />
									<source srcSet="/img/main/heroes_pish/photo_3_mobile.jpg" type="image/jpeg" />
									<Image 
										src="/img/main/heroes_pish/photo_3_mobile.jpg" 
										alt="Портрет Штермер Ванессы" 
										fill
										unoptimized={true}
									/>
								</picture>
							</div>
						</div>
					</div>
				</section>
			) : (
				<section className="heroes_pish main">
					<h1><span>Биоинженеры дальнего</span></h1>

					<div className="section_content">
						<div className="upper_part">
							<div className="block_hero">
								<div className="block_info">
									<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
										<source srcSet="/img/main/heroes_pish/photo_1.webp" type="image/webp" />
										<source srcSet="/img/main/heroes_pish/photo_1.jpg" type="image/jpeg" />
										<Image 
											src="/img/main/heroes_pish/photo_1.jpg" 
											alt="Портрет Сидоренко Андрея Владимировича" 
											fill
											unoptimized={true}
										/>
									</picture>

									<div className="text_info">
										<span className="fio">Сидоренко Андрей Владимирович</span>
										<span className="description">Главный механик производства «Кормбиосинтез»</span>
									</div>
								</div>

								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 1)} />
							</div>

							<div className="block_hero">
								<div className="block_info">
									<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
										<source srcSet="/img/main/heroes_pish/photo_2.webp" type="image/webp" />
										<source srcSet="/img/main/heroes_pish/photo_2.jpg" type="image/jpeg" />
										<Image 
											src="/img/main/heroes_pish/photo_2.jpg" 
											alt="Портрет Рочина Егора Олеговича" 
											fill
											unoptimized={true}
										/>
									</picture>

									<div className="text_info">
										<span className="fio">Рочин Егор Олегович</span>
										<span className="description">
											Ведущий технолог НГПК «Арника», специализирующейся на производстве биодобавок 
											для сельскохозяйственной отрасли
										</span>
									</div>
								</div>

								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 2)} />
							</div>
						</div>

						<div className="lower_part">
							<div className="block_hero">
								<StandardButton text="Узнать больше" type="learn_more" funForButton={() => handlePopupOpen(true, 3)} />

								<div className="block_info">
									<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
										<source srcSet="/img/main/heroes_pish/photo_3.webp" type="image/webp" />
										<source srcSet="/img/main/heroes_pish/photo_3.jpg" type="image/jpeg" />
										<Image 
											src="/img/main/heroes_pish/photo_3.jpg" 
											alt="Портрет Штермер Ванессы" 
											fill
											unoptimized={true}
										/>
									</picture>

									<div className="text_info">
										<span className="fio">Штермер Ванесса</span>

										<span className="description">
											Лаборант-исследователь молодёжной лаборатории ДНК-рекомбинантных технологий ПИШ, студентка 
											4 курса направления «Биотехнология»
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="patterns">
						<div className="pattern">
							<Image src="/img/main/ellips_2.svg" alt="pattern on the background" fill unoptimized={true} />
						</div>
					</div>
				</section>
			)}

			{popupHeroShow && <PopupHero isMobile={isMobile} popupHeroOpen={popupHeroOpen} popupIdHero={popupIdHero} popupVideoUrl={popupVideoUrl} funForClose={() => handlePopupOpen(false)} />}
			
			{/* {popupBioengineerShow && <PopupBioengineerBlocked onClose={handleBioengineerPopupClose} />} */}
		</>
	);
}