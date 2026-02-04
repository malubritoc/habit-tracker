import axios from 'axios';
import { API_BASE_URL } from './@index';
import { Record } from '@/types/records';


export async function getTodayUserHabitRecords(token: string | undefined): Promise<Record[]> {

  const response = await axios.get<Record[]>(
    `${API_BASE_URL}/v1/habitos/registros/hoje`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log(response)

  return response.data;
}
