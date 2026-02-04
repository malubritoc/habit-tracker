import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';
import { DayOfWeek } from '@/types/daysOfTheWeek';

interface createUserHabitRequest {
  token: string | undefined;
  title: string;
  description: string;
  daysOfWeek: DayOfWeek[]
}

export async function createUserHabit({
  token,
  title,
  description,
  daysOfWeek
}: createUserHabitRequest): Promise<Habit> {

  const response = await axios.post<Habit>(
    `${API_BASE_URL}/v1/habits`,
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
