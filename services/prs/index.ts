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

const getOpenedPR = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/pr/open');
    console.log('/pr/open response:', response);
    return response;
  } catch (error: any) {
    return error;
  }
};
const getAllPR = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get('/pr');
    console.log('/pr response:', response);
    return response;
  } catch (error: any) {
    return error;
  }
};

const getPRHandle = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post('/pr/handle', {
      Headers: { id: id },
    });

    console.log('/pr/handle (getPRHandle): ', response);
    return response;
  } catch (error: any) {
    return error;
  }
};

export { getPRStats, getOpenedPR, getAllPR, getPRHandle };
