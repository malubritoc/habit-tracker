/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface deleteUserHabitRecordRequest {
  token: string | undefined;
  habitId: string;
  recordId: string
}


export async function deleteUserHabitRecord({
  token, habitId, recordId
} : deleteUserHabitRecordRequest): Promise<any> {

  const response = await axios.delete<any>(
    `${API_BASE_URL}/v1/habits/${habitId}/records/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
