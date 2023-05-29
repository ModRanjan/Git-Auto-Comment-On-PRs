import axios from '@/Services/index';
import { AxiosResponse } from 'axios';

const getCommitData = async (
  startDate: Date,
  endDate: Date,
): Promise<AxiosResponse<any>> => {
  try {
    const tempStartDate = startDate.toISOString();
    const tempEndDate = endDate.toISOString();

    console.log(`startDate: ${tempStartDate}, endDate: ${tempEndDate}`);

    const response = await axios.get('/commits', {
      headers: { startDate: tempStartDate, endDate: tempEndDate },
    });

    console.log('/commits response: ', response);
    return response;
  } catch (error: any) {
    return error;
  }
};

export { getCommitData };
