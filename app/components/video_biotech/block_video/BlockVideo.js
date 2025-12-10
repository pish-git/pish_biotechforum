import Link from 'next/link';
import Image from 'next/image';

import "./block_video.css";



export default function BlockVideo({ videoBlocked, videoCoverSrc, videoCoverwebpSrc, videoTimer, funForButton, videoInfoHeader, videoInfoDescription }) {
	return (
		<>
			{videoBlocked ? (
				<div className="block_video _blocked" onClick={funForButton}>
					<div className="video_cover">
						<span></span>
						<svg xmlns="http://www.w3.org/2000/svg" width="51" height="63" viewBox="0 0 51 63" fill="none">
							<path d="M41.125 22.125V15.875C41.125 7.125 34.25 0.25 25.5 0.25C16.75 0.25 9.875 7.125 9.875 15.875V22.125C4.5625 22.125 0.5 26.1875 0.5 31.5V53.375C0.5 58.6875 4.5625 62.75 9.875 62.75H41.125C46.4375 62.75 50.5 58.6875 50.5 53.375V31.5C50.5 26.1875 46.4375 22.125 41.125 22.125ZM16.125 15.875C16.125 10.5625 20.1875 6.5 25.5 6.5C30.8125 6.5 34.875 10.5625 34.875 15.875V22.125H16.125V15.875Z" fill="white"/>
						</svg>
					</div>

					<div className="video_info">
						<h4>{videoInfoHeader}</h4>

						<p>{videoInfoDescription}</p>
					</div>
				</div>
			) : (
				<div className="block_video" onClick={funForButton}>
					<div className="video_cover">
						<picture style={{ position: "absolute", width: "100%", height: "100%"}}>
							<source srcSet={videoCoverwebpSrc} type="image/webp" />
							<source srcSet={videoCoverSrc} type="image/jpeg" />
							<Image 
								src={videoCoverSrc} 
								alt="" 
								fill
								unoptimized={true}
								objectFit='cover'
								objectPosition='bottom right'
							/>
						</picture>

						<span>{videoTimer}</span>
					</div>

					<div className="video_info">
						<h4>{videoInfoHeader}</h4>

						<p>{videoInfoDescription}</p>
					</div>
				</div>
			)}
		</>
	);
}