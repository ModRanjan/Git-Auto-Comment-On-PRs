import axios from '@/services/index';
import { AxiosResponse, AxiosError } from 'axios';

const getJWTToken = async (code: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `http://localhost:3000/signup?code=${code}`,
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

const signInOrSignUp = async () => {
  return window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }&scope=${'repo'}`,
  );
};

export { signInOrSignUp, getJWTToken };
