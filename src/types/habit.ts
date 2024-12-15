import { DayOfWeek } from "./daysOfTheWeek";

export interface Habit {
    id: string;
    name: string;
    done: boolean;
    frequency: number;
    days: DayOfWeek[];
}