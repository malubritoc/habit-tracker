import axios from 'axios';
import { API_BASE_URL } from './@index';
import { User } from '@/types/users';


export async function getAllUsers(token: string | undefined): Promise<User[]> {

  const response = await axios.get<User[]>(
    `${API_BASE_URL}/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
