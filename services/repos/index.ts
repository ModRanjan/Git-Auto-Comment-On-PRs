import axios from '@/Services/index';
import { AxiosResponse } from 'axios';

const getRepositories = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/repos');

    return response;
  } catch (error: any) {
    return error;
  }
};

const addComments = async (id: number): Promise<AxiosResponse<any>> => {
  const repoId = id;
  try {
    const response = await axios.post(
      '/repo/hook',
      {},
      {
        headers: { repoId },
      },
    );

    return response;
  } catch (error: any) {
    return error;
  }
};

export { getRepositories, addComments };
