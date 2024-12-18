import { Habit } from "./habit";

export interface Record {
    id: string;
    habit: Habit;
    done: boolean;
    createdAt: string;
    habit_id: string;
    user_id: string;
}