/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface completeUserHabitRecordRequest {
  token: string | undefined;
  habitId: string;
  recordId: string
}


export async function completeUserHabitRecord({
  token, habitId, recordId
} : completeUserHabitRecordRequest): Promise<any> {

  const response = await axios.patch<any>(
    `${API_BASE_URL}/v1/habits/${habitId}/records/${recordId}/complete`,
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
