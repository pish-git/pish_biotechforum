"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import './standard_button.css';
import './standard_button_media.css';



export default function StandardButton({ text, type, funForButton, link="/musei" }) {
	const [typeButton, setTypeButton] = useState("standard");

	useEffect(() => {
		if(type === "learn_more"){
			setTypeButton("learn_more");
		} else{
			setTypeButton("standard");
		}
	}, [type]);

	return (
		<>
			{typeButton === "learn_more" ? (
				<button className="button_learn_more" onClick={funForButton}>
					<span className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
							<path fillRule="evenodd" clipRule="evenodd" d="M14.3752 3.45831C11.6125 3.45831 8.96297 4.55578 7.00947 6.50928C5.05596 8.46279 3.9585 11.1123 3.9585 13.875C3.9585 16.6377 5.05596 19.2872 7.00947 21.2407C8.96297 23.1942 11.6125 24.2916 14.3752 24.2916C17.1378 24.2916 19.7874 23.1942 21.7409 21.2407C23.6944 19.2872 24.7918 16.6377 24.7918 13.875C24.7918 11.1123 23.6944 8.46279 21.7409 6.50928C19.7874 4.55578 17.1378 3.45831 14.3752 3.45831ZM0.833496 13.875C0.833496 10.2835 2.2602 6.83913 4.79976 4.29958C7.33931 1.76002 10.7837 0.333313 14.3752 0.333313C17.9666 0.333313 21.411 1.76002 23.9506 4.29958C26.4901 6.83913 27.9168 10.2835 27.9168 13.875C27.9168 17.4665 26.4901 20.9108 23.9506 23.4504C21.411 25.9899 17.9666 27.4166 14.3752 27.4166C10.7837 27.4166 7.33931 25.9899 4.79976 23.4504C2.2602 20.9108 0.833496 17.4665 0.833496 13.875Z"/>
							<path fillRule="evenodd" clipRule="evenodd" d="M22.6459 22.1458C22.9389 21.8532 23.336 21.6888 23.7501 21.6888C24.1642 21.6888 24.5613 21.8532 24.8543 22.1458L33.1876 30.4791C33.3411 30.6222 33.4642 30.7947 33.5496 30.9863C33.635 31.178 33.681 31.3849 33.6847 31.5947C33.6884 31.8045 33.6498 32.0129 33.5712 32.2075C33.4926 32.402 33.3756 32.5788 33.2273 32.7271C33.0789 32.8755 32.9021 32.9925 32.7076 33.0711C32.513 33.1496 32.3046 33.1882 32.0948 33.1845C31.885 33.1808 31.6781 33.1349 31.4865 33.0495C31.2948 32.9641 31.1223 32.841 30.9793 32.6875L22.6459 24.3541C22.3533 24.0612 22.189 23.664 22.189 23.25C22.189 22.8359 22.3533 22.4388 22.6459 22.1458Z"/>
						</svg>
					</span>

					<span className="text">{text}</span>
					<span className="bg"></span>
				</button>
			) : (
				<Link href={link} className="button_visit">
					<span className="text">{text}</span>
					<span className="bg"></span>
				</Link>
			)}
		</>
	);
}