import axios from '@/Services/index';
import { AxiosResponse } from 'axios';

const getCommitData = async (
  startDate: Date,
  endDate: Date,
): Promise<AxiosResponse<any>> => {
  try {
    const tempStartDate = startDate.toISOString();
    const tempSndDate = endDate.toISOString();
    const response = await axios.get('/commits', {
      headers: { startDate: tempStartDate, endDate: tempSndDate },
    });

    return response;
  } catch (error: any) {
    return error;
  }
};

export { getCommitData };
