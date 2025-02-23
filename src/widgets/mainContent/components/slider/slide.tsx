import {IEvent} from "../../../../shared/types/history.types";
import {FC} from "react";
import styles from './styles.module.scss'

interface IProps {
    event: IEvent
}

export const Slide: FC<IProps> = ({event}) => {
    return (
        <div className={styles.slide}>
            <h5>{event.year}</h5>
            <p>{event.description}</p>
        </div>
    )
}