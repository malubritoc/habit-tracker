/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';


export async function deleteUser(): Promise<any> {
    const token = 'sdjfndsfj'

  const response = await axios.delete<any>(
    `${API_BASE_URL}/v1/usuarios/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
