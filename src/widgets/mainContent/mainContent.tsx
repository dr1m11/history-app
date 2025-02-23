import styles from './style.module.scss'
import {TimeCircle} from "./components/timeCircle/timeCircle";
import {useMemo, useState} from "react";
import historyPeriods from '../../shared/assets/mocks/historyPeriods.json'
import {useAnimatedNumber} from "../../shared/lib/hooks/useAnimatedNumber";
import {Navigation} from "./components/navigation/navigation";
import {Slider} from "./components/slider/slider";
import {useResize} from "../../shared/lib/hooks/useResize";

export const MainContent = () => {
    const [period, setPeriod] = useState(historyPeriods[0])

    const width = useResize()

    const animationDuration = 500;
    const periodFrom = useAnimatedNumber(period.period.from, animationDuration)
    const periodTo = useAnimatedNumber(period.period.to, animationDuration)

    const activeIndex = useMemo(() => {
        return historyPeriods.findIndex(item => item.title === period.title)
    }, [period])

    return (
        <div className={styles.root}>
            <div className={styles.root__gradient}/>
            <div className={styles.content}>
                <div className={styles.horizontal__line}/>
                <div className={styles.circle}/>
                <h1 className={styles.title}>Исторические <br/> даты</h1>
                <div className={styles.dates}>
                    <h2>{periodFrom}</h2>
                    <h2>{periodTo}</h2>
                </div>
                {width > 1024 &&
                    <>
                        <TimeCircle setPeriod={setPeriod} activeIndex={activeIndex}/>
                        <Navigation
                            handleNext={() => setPeriod(historyPeriods[activeIndex + 1])}
                            handlePrev={() => setPeriod(historyPeriods[activeIndex - 1])}
                            activeIndex={activeIndex}
                            length={historyPeriods.length}
                        />
                    </>
                }
            </div>
            <Slider
                events={period.events}
                title={period.title}
                handleNext={() => setPeriod(historyPeriods[activeIndex + 1])}
                handlePrev={() => setPeriod(historyPeriods[activeIndex - 1])}
                activeIndex={activeIndex}
                length={historyPeriods.length}
                setPeriod={(period) => setPeriod(historyPeriods[period])}
            />
        </div>
    )
}