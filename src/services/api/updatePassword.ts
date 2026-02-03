/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface updatePasswordRequest {
  password: string;
  newPassword: string;
}

export async function updatePassword({
    password,
    newPassword
}: updatePasswordRequest): Promise<any> {
  const token = 'djkfndsf'

  const response = await axios.patch<any>(
    `${API_BASE_URL}/v1/usuarios/me/senha`,
    {
        senhaAtual: password,
        novaSenha: newPassword
    },  
        {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
