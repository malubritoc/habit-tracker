import axios from 'axios';
import { API_BASE_URL } from './@index';
import { User } from '@/types/users';


export async function createUser(): Promise<User> {
    const token = 'sdjfndsfj'

  const response = await axios.get<User>(
    `${API_BASE_URL}/v1/usuarios/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
