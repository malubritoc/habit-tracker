import { DayOfWeek } from "./daysOfTheWeek";

export interface Habit {
    id: string;
    name: string;
    frequency: number;
    days: DayOfWeek[];
}