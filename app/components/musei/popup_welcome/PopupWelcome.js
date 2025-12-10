"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import './popup_welcome.css';
import './popup_welcome_media.css';

export default function PopupWelcome({ onClose, pageType = 'museum' }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Проверяем, был ли уже показан попап для этой страницы
        const popupShown = localStorage.getItem(`popupWelcome_shown_${pageType}`);
        
        if (!popupShown) {
            setIsVisible(true);
        }
    }, [pageType]);

    const handleClose = async () => {
        // Сразу закрываем попап
        setIsClosing(true);
        
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, 300);

        // Отправляем данные о посещении (не блокируем закрытие)
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'visit',
                    pageType: pageType
                }),
            });

            if (response.ok) {
                console.log('✅ Данные о посещении отправлены');
                // Сохраняем в localStorage только если данные успешно отправлены
                localStorage.setItem(`popupWelcome_shown_${pageType}`, 'true');
            } else {
                console.error('❌ Ошибка при отправке данных о посещении');
                // Не сохраняем в localStorage при ошибке
            }
        } catch (error) {
            console.error('❌ Ошибка сети:', error);
            // Не сохраняем в localStorage при ошибке сети
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`popup_welcome ${isClosing ? '_hidden' : ''}`}>
            <div className="popup_content">
                <div className="block_img">
                    <Image src="/img/video_biotech/popup_bg.png" alt="" fill unoptimized={true} />
                </div>

                <div className="block_content">
                    <div className="block_text">
                        {pageType == 'museum' ? (
                            <h1>Добро пожаловать в биотех музей!</h1>
                        ) : (
                            <h1>Видеоуроки о биотехе</h1>
                        )}
                    </div>
                    
                    <button className="visit_button" onClick={handleClose}>
                        Посетить
                    </button>
                </div>
            </div>
        </div>
    );
}