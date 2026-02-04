/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';


export async function deleteUserAdmin(token: string | undefined, email: string): Promise<any> {

  const response = await axios.delete<any>(
    `${API_BASE_URL}/v1/users/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
