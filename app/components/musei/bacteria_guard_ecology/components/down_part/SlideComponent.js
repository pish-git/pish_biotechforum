// SlideComponent.js
"use client";

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';

const SlideComponent = ({ slides, onSlideChange, sliderId }) => {
  const swiperRef = useRef(null);
  const currentSlideRef = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const handleSlideChange = (swiper) => {
      const realIndex = swiper.realIndex;
      // Предотвращаем вызов при инициализации, если индекс не изменился
      if (currentSlideRef.current === realIndex && isInitialized.current) return;
      
      currentSlideRef.current = realIndex;
      if (onSlideChange) {
        onSlideChange(sliderId, slides[realIndex].id);
      }
      
      if (!isInitialized.current) {
        isInitialized.current = true;
      }
    };

    // Обработчик только для изменения слайда
    swiper.on('slideChange', handleSlideChange);

    // Инициализация начального значения
    if (!isInitialized.current) {
      const initialIndex = swiper.realIndex;
      currentSlideRef.current = initialIndex;
      if (onSlideChange) {
        onSlideChange(sliderId, slides[initialIndex].id);
      }
      isInitialized.current = true;
    }

    return () => {
      if (swiper) {
        swiper.off('slideChange', handleSlideChange);
      }
    };
  }, [slides, onSlideChange, sliderId]);

  return (
    <div className="slide-container">
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        mousewheel={true}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        modules={[Mousewheel, FreeMode]}
        className="slide-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              <img src={slide.image.src} alt="" />
              <p>{slide.text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < slide.text.split('\n').length - 1 && <br />}
                </span>
              ))}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideComponent;