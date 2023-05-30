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

const addComments = async (repoId: number): Promise<AxiosResponse<any>> => {
  try {
    console.log('repoId: ', repoId);
    const response = await axios.post(
      '/repo/handle/comment',
      {},
      { headers: { repoid: repoId } },
    );

    console.log('/repo/handle/comment (addComments): ', response);
    return response;
  } catch (error: any) {
    return error;
  }
};

export { getRepositories, addComments };
