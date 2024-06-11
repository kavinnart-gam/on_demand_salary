import axios from 'axios';
import {LoginFormValues} from '../../interfaces/users';

export const login = async ({phoneNumber}: LoginFormValues) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/signin', {
      phone: phoneNumber,
    });
    console.log('response.data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};
