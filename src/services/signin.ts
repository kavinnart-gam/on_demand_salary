import {axios} from '../utils';

export const signin = async (phoneNumber: string) => {
  try {
    const response = await axios.post('/api/v1/signin', {
      phone: phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};
