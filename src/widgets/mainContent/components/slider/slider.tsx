import {gsap} from 'gsap';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {IEvent} from "../../../../shared/types/history.types";
import styles from './styles.module.scss'
import {useGSAP} from "@gsap/react";
import {FC, useCallback, useRef, useState} from "react";
import {Slide} from "./slide";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import {useResize} from "../../../../shared/lib/hooks/useResize";
import {IDisplayedData} from "./slider.types";
import {Navigation} from "../navigation/navigation";
import historyPeriods from "../../../../shared/assets/mocks/historyPeriods.json";

gsap.registerPlugin(useGSAP);

interface IProps {
    events: IEvent[];
    title: string;
    handleNext: () => void;
    handlePrev: () => void;
    activeIndex: number;
    length: number;
    setPeriod: (period: number) => void;
}

interface ISwiperButtonProps {
    onClick: () => void;
    direction: 'prev' | 'next';
    isActive: boolean;
}

type TPosition = 'beginning' | 'middle' | 'end'

const SwiperButton: FC<ISwiperButtonProps> = ({onClick, direction, isActive}) => {
    const width = useResize()
    const isVisible = width > 1024 && isActive
    return (
        <>
            {isVisible &&
                <button onClick={onClick}
                        className={`${styles.swiper__button} ${direction === 'prev' ? styles.button__prev : styles.button__next}`}>
                    {direction === 'next' ? '>' : '<'}
                </button>
            }
        </>
    )
}

export const Slider: FC<IProps> = ({events, title, handleNext, handlePrev, length, activeIndex, setPeriod}) => {
    const ref = useRef<SwiperRef>(null)
    const containerRef = useRef(null)
    const [currentPosition, setCurrentPosition] = useState<TPosition>('beginning')
    const [displayedData, setDisplayedData] = useState<IDisplayedData>({events, title, activeIndex})

    const width = useResize()

    const handleNextSlide = useCallback(() => {
        ref.current?.swiper.slidePrev()
    }, [])

    const handlePrevSlide = useCallback(() => {
        ref.current?.swiper.slideNext()
    }, [])

    useGSAP(() => {
        if (JSON.stringify(events) !== JSON.stringify(displayedData.events)) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    setDisplayedData({
                        events,
                        title,
                        activeIndex,
                    })
                    ref.current?.swiper.slideTo(0, 0)
                    gsap.to(containerRef.current, {
                        opacity: 1,
                        duration: 1,
                    })
                }
            })
        }
    }, [events, title])

    return (
        <div className={styles.root} ref={containerRef}>
            {
                width <= 1024 &&
                <div className={styles.period}>
                    <h3>{displayedData.title}</h3>
                </div>
            }
            <SwiperButton onClick={handleNextSlide} direction={'prev'} isActive={currentPosition !== 'beginning'}/>
            <Swiper
                ref={ref}
                slidesPerView={'auto'}
                spaceBetween={20}
                pagination={{clickable: true}}
                onSlideChange={(swiper: { isBeginning: boolean; isEnd: boolean; }) => {
                    if (swiper.isBeginning) setCurrentPosition('beginning')
                    else if (swiper.isEnd) setCurrentPosition('end')
                    else setCurrentPosition('middle')
                }}
                className={styles.slider__container}
                breakpoints={{
                    1280: {
                        slidesPerView: 3.3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2.6,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 15,
                    }
                }}
            >
                {displayedData.events.map(event => (
                    <SwiperSlide key={event.year}>
                        <Slide event={event}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperButton onClick={handlePrevSlide} direction={'next'} isActive={currentPosition !== 'end'}/>

            {
                width <= 1024 &&
                <Navigation
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    activeIndex={displayedData.activeIndex}
                    length={historyPeriods.length}
                    setPeriod={setPeriod}
                />
            }
        </div>
    );
};