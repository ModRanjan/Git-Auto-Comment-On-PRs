import axios from '@/Services/index';
import { AxiosResponse } from 'axios';

const getPRStats = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/pr/stats');

    return response;
  } catch (error: any) {
    return error;
  }
};

const getPROpen = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/pr/open');

    return response;
  } catch (error: any) {
    return error;
  }
};

const getPRHandle = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post('/pr/handle');

    return response;
  } catch (error: any) {
    return error;
  }
};

export { getPRStats, getPROpen, getPRHandle };
