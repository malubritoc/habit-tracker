import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';
import { DayOfWeek } from '@/types/daysOfTheWeek';

interface patchUserHabitRequest {
  token: string;
  id: string;
  name: string;
  description: string;
  days: DayOfWeek[]
}

export async function patchUserHabit({
  token,
  id,
  name,
  description,
  days
}: patchUserHabitRequest): Promise<Habit> {

  const response = await axios.patch<Habit>(
    `${API_BASE_URL}/v1/habitos/${id}`,
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
