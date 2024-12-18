import { DayOfWeek } from "./daysOfTheWeek";

export interface Habit {
    id: string;
    name: string;
    description: string;
    frequency: number;
    days: DayOfWeek[];
    user_id: string;
}