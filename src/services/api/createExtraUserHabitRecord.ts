/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface createExtraUserHabitRecordRequest {
  token: string | undefined;
  habitId: string;
}


export async function createExtraUserHabitRecord({
  token, habitId
} : createExtraUserHabitRecordRequest): Promise<any> {

  const response = await axios.post<any>(
    `${API_BASE_URL}/v1/habits/${habitId}/records/extra`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log(response)

  return response.data;
}
