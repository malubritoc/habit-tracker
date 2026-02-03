import axios from 'axios';
import { API_BASE_URL } from './@index';
import { User } from '@/types/users';

interface createUserRequest {
  email: string;
  password: string;
}

export async function createUser({
  email,
  password
}: createUserRequest): Promise<User> {

  const response = await axios.post<User>(
    `${API_BASE_URL}/v1/usuarios`,
    {
        email,
        senha: password
    },  
  );

  return response.data;
}
