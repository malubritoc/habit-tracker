import { DayOfWeek } from "./daysOfTheWeek";

export interface Habit {
    id: string;
    titulo: string;
    descricao: string;
    frequencia: number;
    diasSemana: DayOfWeek[];
}