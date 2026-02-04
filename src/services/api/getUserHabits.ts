import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';


export async function getUserHabits(token: string | undefined): Promise<Habit[]> {

  const response = await axios.get<Habit[]>(
    `${API_BASE_URL}/v1/habits`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
