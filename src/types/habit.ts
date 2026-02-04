import { DayOfWeek } from "./daysOfTheWeek";

export interface Habit {
    id: string;
    title: string;
    description: string;
    frequency: number;
    daysOfWeek: DayOfWeek[];
}