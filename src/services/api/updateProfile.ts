/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface updateProfileRequest {
  name: string;
  bio: string;
}

export async function updateProfile({
    name,
    bio
}: updateProfileRequest): Promise<any> {
    const token = 'djkfndsf'

  const response = await axios.patch<any>(
    `${API_BASE_URL}/v1/usuarios/me/perfil`,
    {
        nomeExibicao: name,
        bio
    },  
        {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
