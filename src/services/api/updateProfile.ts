/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_BASE_URL } from './@index';

interface updateProfileRequest {
  token: string | undefined;
  name: string;
  bio: string;
}

export async function updateProfile({
    token,
    name,
    bio
}: updateProfileRequest): Promise<any> {

  const response = await axios.patch<any>(
    `${API_BASE_URL}/v1/users/me/profile`,
    {
        displayName: name,
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
