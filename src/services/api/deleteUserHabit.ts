/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface deleteUserHabitRequest {
  token: string;
  id: string;
}

export async function deleteUserHabit({
  token,
  id
}: deleteUserHabitRequest): Promise<any> {

  const response = await axios.delete<any>(
    `${API_BASE_URL}/v1/habitos/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
