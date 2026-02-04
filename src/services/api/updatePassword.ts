/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface updatePasswordRequest {
  token: string | undefined;
  password: string;
  newPassword: string;
}

export async function updatePassword({
    token,
    password,
    newPassword
}: updatePasswordRequest): Promise<any> {

  const response = await axios.patch<any>(
    `${API_BASE_URL}/v1/users/me/password`,
    {
        currentPassword: password,
        newPassword
    },  
        {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
