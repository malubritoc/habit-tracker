import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Habit } from '@/types/habit';


export async function getUserHabitRecords({habitId, token} : {habitId: string; token: string | undefined}): Promise<Habit[]> {

  const response = await axios.get<Habit[]>(
    `${API_BASE_URL}/v1/habits/${habitId}/records`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log(response)

  return response.data;
}
