import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';
import { DayOfWeek } from '@/types/daysOfTheWeek';

interface createUserHabitRequest {
  token: string | undefined;
  name: string;
  description: string;
  days: DayOfWeek[]
}

export async function createUserHabit({
  token,
  name,
  description,
  days
}: createUserHabitRequest): Promise<Habit> {

  const response = await axios.post<Habit>(
    `${API_BASE_URL}/v1/habitos`,
    {
        titulo: name,
        descricao: description,
        diasSemana: days
    },  
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
