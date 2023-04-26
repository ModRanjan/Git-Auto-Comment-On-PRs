import axios from '@/Services/index';
import { AxiosResponse } from 'axios';

const getUser = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/user');

    return response;
  } catch (error: any) {
    return error;
  }
};

export { getUser };
