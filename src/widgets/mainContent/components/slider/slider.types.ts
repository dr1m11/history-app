import {IEvent} from "../../../../shared/types/history.types";

export interface IDisplayedData {
    events: IEvent[];
    title: string;
    activeIndex: number;
}