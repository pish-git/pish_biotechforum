"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

import './block_partitions.css';
import './block_partitions_media.css';


import partitionBg1Webp from '../../img/block_partitions/1.webp';
import partitionBg1Png from '../../img/block_partitions/1.png';
import partitionBg2Webp from '../../img/block_partitions/2.webp';
import partitionBg2Png from '../../img/block_partitions/2.png';
import partitionBg3Webp from '../../img/block_partitions/3.webp';
import partitionBg3Png from '../../img/block_partitions/3.png';
import partitionBg4Webp from '../../img/block_partitions/4.webp';
import partitionBg4Png from '../../img/block_partitions/4.png';
import partitionBg5Webp from '../../img/block_partitions/5.webp';
import partitionBg5Png from '../../img/block_partitions/5.png';



export default function BlockPartitions({ isHidden, onPartitionSelect }) {
    const [selectedPartition, setSelectedPartition] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handlePartitionClick = (partitionKey) => {
        setSelectedPartition(partitionKey);
        setShowDetails(true);
        
        // Передаем выбранный раздел в родительский компонент
        if (onPartitionSelect) {
            onPartitionSelect(partitionKey);
        }
    };

    const handleBackButton = () => {
        if (showDetails) {
            setShowDetails(false);
            setSelectedPartition(null);
        }
    };

    return (
        <div className={`block_partitions ${isHidden ? '_hidden' : ''}`}>
            {/* Блок выбора раздела */}
            <div className={`block_selection_partitions ${showDetails ? '_hidden' : ''}`}>
                <div className="partition" onClick={() => handlePartitionClick('bioengineering')}>
                    <div className="block_img">
                        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                            <source srcSet={partitionBg1Webp.src} type="image/webp" />
                            <source srcSet={partitionBg1Png.src} type="image/jpeg" />
                            <Image 
                                src={partitionBg1Png} 
                                alt="" 
                                fill
                                unoptimized={true}
                            />
                        </picture>
                    </div>

                    <h4>Биоинженерия</h4>
                    <p>7 живых систем</p>
                </div>

                <div className="partition" onClick={() => handlePartitionClick('industrial_goods')}>
                    <div className="block_img">
                        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                            <source srcSet={partitionBg2Webp.src} type="image/webp" />
                            <source srcSet={partitionBg2Png.src} type="image/jpeg" />
                            <Image 
                                src={partitionBg2Png} 
                                alt="" 
                                fill
                                unoptimized={true}
                            />
                        </picture>
                    </div>

                    <h4>Промтовары</h4>
                    <p>7 живых систем</p>
                </div>

                <div className="partition" onClick={() => handlePartitionClick('food')}>
                    <div className="block_img">
                        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                            <source srcSet={partitionBg3Webp.src} type="image/webp" />
                            <source srcSet={partitionBg3Png.src} type="image/jpeg" />
                            <Image 
                                src={partitionBg3Png} 
                                alt="" 
                                fill
                                unoptimized={true}
                            />
                        </picture>
                    </div>

                    <h4>Продовольствие</h4>
                    <p>4 живых систем</p>
                </div>

                <div className="partition" onClick={() => handlePartitionClick('science')}>
                    <div className="block_img">
                        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                            <source srcSet={partitionBg4Webp.src} type="image/webp" />
                            <source srcSet={partitionBg4Png.src} type="image/jpeg" />
                            <Image 
                                src={partitionBg4Png} 
                                alt="" 
                                fill
                                unoptimized={true}
                            />
                        </picture>
                    </div>

                    <h4>Наука</h4>
                    <p>3 живых систем</p>
                </div>

                <div className="partition">
                    <div className="block_img">
                        <picture style={{ position: "absolute", width: "100%", height: "100%"}}>
                            <source srcSet={partitionBg5Webp.src} type="image/webp" />
                            <source srcSet={partitionBg5Png.src} type="image/jpeg" />
                            <Image 
                                src={partitionBg1Png} 
                                alt="" 
                                fill
                                unoptimized={true}
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    );
};