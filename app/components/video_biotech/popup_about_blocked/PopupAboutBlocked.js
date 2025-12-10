"use client";

import { useState } from 'react';
import Image from "next/image";

import './popup_about_blocked.css';
import './popup_about_blocked_media.css';



export default function PopupAboutBlocked({ popupHeroOpen, funForClose, onFormSuccess }) {
    const [formData, setFormData] = useState({
        fio: '',
        email: '',
        region: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		if (!formData.fio || !formData.email || !formData.region) {
			setMessage('Все поля обязательны для заполнения');
			setIsLoading(false);
			return;
		}

		try {
			console.log('Отправка данных:', formData);
			
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			console.log('Статус ответа:', response.status);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('Ответ сервера:', result);

			if (response.ok) {
				setMessage('✅ Данные успешно отправлены!');
				setFormData({ fio: '', email: '', region: '' });
				
				if (onFormSuccess) {
					onFormSuccess();
				}
				
				setTimeout(() => {
					funForClose();
				}, 2000);
			} else {
				setMessage(result.message || 'Произошла ошибка при отправке');
			}
		} catch (error) {
			console.error('❌ Ошибка сети:', error);
			setMessage('Ошибка сети при отправке формы: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	};


	
    return (
        <div className={`popup_about_blocked ${popupHeroOpen ? "" : "_hidden"}`}>
            <div className="popup_blackout" onClick={funForClose}></div>

            <div className="popup_content">
				<div className="block_img">
					<Image src="/img/video_biotech/popup_bg.png" alt="" fill unoptimized={true} />
				</div>

                <div className="block_content">
                    <div className="block_text">
                        <h1>Упс!</h1>
                        <p>Для доступа к этому видеоуроку заполните форму</p>
                    </div>

                    <form onSubmit={handleSubmit} className="registration_form">
						<div className="form_group">
							<input
								type="text"
								name="fio"
								placeholder="ФИО"
								value={formData.fio}
								onChange={handleInputChange}
								required
								disabled={isLoading}
							/>
						</div>
						
						<div className="form_group">
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleInputChange}
								required
								disabled={isLoading}
							/>
						</div>
						
						<div className="form_group">
							<input
								type="text"
								name="region"
								placeholder="Регион"
								value={formData.region}
								onChange={handleInputChange}
								required
								disabled={isLoading}
							/>
						</div>

						{message && (
							<div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
								{message}
							</div>
						)}

						<button 
							type="submit" 
							className="button_submit"
							disabled={isLoading}
						>
							{isLoading ? 'Отправка...' : 'Отправить'}
						</button>
					</form>
                </div>

                <button className="button_exit" onClick={funForClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 73" fill="none">
                        <line x1="4.06066" y1="1.93934" x2="74.0607" y2="71.9393" />
                        <line x1="1.93934" y1="71.9393" x2="71.9393" y2="1.93934" />
                    </svg>
                </button>
            </div>
        </div>
    );
}