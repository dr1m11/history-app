import styles from './styles.module.scss'
import {FC} from "react";

interface IProps {
    handleNext: () => void;
    handlePrev: () => void;
    activeIndex: number;
    length: number;
    setPeriod?: (period: number) => void;
}

export const Navigation: FC<IProps> = ({activeIndex, length, handleNext, handlePrev, setPeriod}) => {
    const isLast= activeIndex === length - 1
    const isFirst= activeIndex === 0

    const navItems = Array(length).fill(0)

    return (
        <div className={styles.navigation}>
            <div className={styles.buttons__container}>
                {/* Поскольку в тз было сказано, что максимальное число отрезков - 6, я не стал выдумывать велосипед с форматированием */}
                <span className={styles.counter}>0{activeIndex + 1}/0{length}</span>
                <div className={styles.buttons}>
                    <button disabled={isFirst} onClick={handlePrev}>{'<'}</button>
                    <button disabled={isLast} onClick={handleNext}>{'>'}</button>
                </div>
            </div>
            {
                setPeriod &&
                <div className={styles.period__navigation}>
                    {navItems.map((_, index) => (
                        <button
                            key={index}
                            className={styles.period__button}
                            disabled={index === activeIndex}
                            onClick={() => setPeriod(index)}
                        />
                    ))}
                </div>
            }
        </div>
    )
}