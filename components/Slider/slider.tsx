'use client';

import React, { useEffect, useState, useRef } from 'react';
import { api } from '@/utils/api';
import { List } from '@/schemas/api-types';
import Image from 'next/image';
import SliderDescription from './slider-description';

const Slider = () => {
  const [sliderList, setSliderList] = useState<List[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  let classes: string;

  useEffect(() => {
    const getList = async () => {
      try {
        const data: List[] = await api.getSliderList();
        setSliderList(data);
      } catch (error) {
        setSliderList([]);
      }
    };
    getList();
  }, []);

  const handleNextButtonClick = () => {
    if (sliderList.length - 1 !== activeIndex) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevButtonClick = () => {
    if (activeIndex !== 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const getClassOnIndex = (index: number) => {
    classes = 'list_element';

    if (index === activeIndex) {
      classes += ' list_element-active';
    }

    if (index < activeIndex) {
      classes += ' list_element-inactive list_element-left';
    }

    if (index > activeIndex) {
      classes += ' list_element-inactive list_element-right';
    }

    if (index > activeIndex + 1 || index < activeIndex - 1) {
      classes += ' list_element-hide';
    }

    return classes;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current - touchEndX.current > 40
      && sliderList.length - 1 !== activeIndex
    ) {
      setActiveIndex((prev) => prev + 1);
    }

    if (touchEndX.current - touchStartX.current > 40 && activeIndex !== 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleListItemClick = (index: number) => {
    if (index > activeIndex) {
      setActiveIndex((prev) => prev + 1);
    }
    if (index < activeIndex) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleKeyDown = (event:React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft' && sliderList.length - 1 !== activeIndex) {
      setActiveIndex((prev) => prev + 1);
    }
    if (event.key === 'ArrowRight' && activeIndex !== 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-9">
        <h2 className="t1-lowercase">
          Есть всё, что бы наполнить жизнь счастьем
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            className="button"
            onClick={handlePrevButtonClick}
          >
            &#10094;
          </button>
          <button
            type="button"
            className="button"
            onClick={handleNextButtonClick}
          >
            &#10095;
          </button>
        </div>
      </div>
      <div
        className="list"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sliderList.map((data, index) => (
          <button
            type="button"
            key={data.id}
            tabIndex={index}
            onClick={() => handleListItemClick(index)}
            onKeyDown={handleKeyDown}
            className={getClassOnIndex(index)}
          >
            <Image
              src={data.image}
              alt="Building"
              width={950}
              height={500}
              priority
            />
            <SliderDescription
              title={data.title}
              description={data.description}
              active={activeIndex === index}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default Slider;
