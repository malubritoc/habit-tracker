import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';
import { DayOfWeek } from '@/types/daysOfTheWeek';

interface patchUserHabitRequest {
  token: string | undefined; 
  id: string;
  title: string;
  description: string;
  daysOfWeek: DayOfWeek[]
}

export async function patchUserHabit({
  token,
  id,
  title,
  description,
  daysOfWeek
}: patchUserHabitRequest): Promise<Habit> {

  const response = await axios.patch<Habit>(
    `${API_BASE_URL}/v1/habits/${id}`,
    {
        title,
        description,
        daysOfWeek
    },  
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
