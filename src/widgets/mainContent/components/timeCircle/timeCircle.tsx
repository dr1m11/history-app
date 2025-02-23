import styles from './styles.module.scss';
import { useGSAP } from '@gsap/react';
import {FC, useMemo} from 'react';
import { gsap } from 'gsap';
import {gsapStyles} from "./timeCircle.helper";
import historyPeriods from '../../../../shared/assets/mocks/historyPeriods.json'
import {IHistoryItem} from "../../../../shared/types/history.types";
import {useResize} from "../../../../shared/lib/hooks/useResize";

gsap.registerPlugin(useGSAP);

const startAngle = -Math.PI / 3;

interface IProps {
    setPeriod: (period: IHistoryItem) => void;
    activeIndex: number;
}

export const TimeCircle: FC<IProps> = ({setPeriod, activeIndex}) => {
    const width = useResize(50)
    const {radius, center} = useMemo(() => {
        let size = 265
        if (width <= 1280){
            size = 200
        }
        return {
            radius: size,
            center: {x: size, y: size}
        }
    }, [width])
    const totalPoints = historyPeriods.length;
    const angleStep = (2 * Math.PI) / totalPoints;
    const currentRotation = -360 / totalPoints * activeIndex

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (activeIndex === index) return;
        gsap.to(event.target, gsapStyles.mouseEnter);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (activeIndex === index) return;
        gsap.to(event.target, gsapStyles.mouseLeave);
    };

    useGSAP(() => {
        gsap.to(`.${styles.circle}`, {
            ...gsapStyles.rotation,
            rotation: -currentRotation,
        });
        gsap.to(`.${styles.dot}`, {
            ...gsapStyles.rotation,
            rotation: currentRotation,
        });

        gsap.to(`.${styles.dot}[data-active="true"]`, gsapStyles.activeDot);
        gsap.to(`.${styles.dot}:not([data-active="true"])`, gsapStyles.unActiveDot);
    }, [activeIndex]);

    const handlePeriod = (period: IHistoryItem) => {
        setPeriod(period)
    }

    return (
        <div className={styles.circle}>
            {historyPeriods.map((item, index) => {
                const angle = startAngle + angleStep * index;
                const x = center.x + radius * Math.cos(angle);
                const y = center.y + radius * Math.sin(angle);

                return (
                    <div
                        style={{left: x, top: y}}
                        className={styles.dot}
                        key={item.title}
                        data-active={activeIndex === index}
                        onClick={() => handlePeriod(item)}
                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                        onMouseLeave={(e) => handleMouseLeave(e, index)}
                    >
                        {index + 1}
                        <p className={styles.dot__title}>{item.title}</p>
                    </div>
                );
            })}
        </div>
    );
}