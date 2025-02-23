export interface IPeriod {
    from: number;
    to: number;
}

export interface IEvent {
    year: number;
    description: string;
}

export interface IHistoryItem {
    title: string;
    period: IPeriod;
    events: IEvent[]
}