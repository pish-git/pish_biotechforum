import Link from 'next/link';
import Image from "next/image";

import './section_about_pish.css';
import './section_about_pish_media.css';

import StandardButton from '../../standard_button/StandardButton';



export default function SectionAboutPish({ isMobile }) {
	return (
		<section className="about_pish">
			<div className="section_content">
				<h1>Передовая инженерная школа</h1>
				<h3>«Институт биотехнологий, биоинженерии и пищевых систем»</h3>

				<div className="mission">
					<h2>Наша миссия</h2>

					<p>
						Развитие отрасли «Биоэкономика» и популяризация биотехнологий на Дальнем Востоке в связке с ведущими 
						научно-образовательными центрами и компаниями в АТР для достижения продовольственной безопасности России.
					</p>
				</div>

				<StandardButton text="Поступить" type="standard" link="https://pish.dvfu.ru/" />
			</div>

			<div className="patterns">
				<div className="pattern">
					<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
						<source srcSet="/img/main/about_pish/pattern_1.webp" type="image/webp" />
						<source srcSet="/img/main/about_pish/pattern_1.png" type="image/jpeg" />
						<Image 
							src="/img/main/about_pish/pattern_1.png" 
							alt="Портрет Штермер Ванессы" 
							fill
							unoptimized={true}
						/>
					</picture>
				</div>

				<div className="pattern">
					<Image src="/img/main/ellips_1.svg" alt="pattern on the background" fill />
				</div>
			</div>
		</section>
	);
}