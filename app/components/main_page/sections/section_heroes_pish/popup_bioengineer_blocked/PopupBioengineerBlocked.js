// PopupBioengineerBlocked.js
"use client";

import { useState } from 'react';
import Image from "next/image";

import './popup_bioengineer_blocked.css';
import './popup_bioengineer_blocked_media.css';

export default function PopupBioengineerBlocked({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 300);
    };

    return (
        <div 
            className={`popup_bioengineer_blocked ${isClosing ? '_hidden' : ''}`}
        >
            <div className="popup_blackout" onClick={handleClose}></div>
            
            <div className="popup_content">
                <div className="block_img">
                    <Image src="/img/video_biotech/popup_bg.png" alt="" fill unoptimized={true} />
                </div>

                <div className="block_content">
                    <div className="block_text">
                        <h1>Скоро на экранах</h1>
                    </div>
                    
                    <button className="close_button" onClick={handleClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}