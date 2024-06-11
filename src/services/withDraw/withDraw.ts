import axios from 'axios';
import {withDrawValues} from '../../interfaces/users';

export const withDraw = async ({amount}: withDrawValues) => {
  try {
    const response = await axios.post('/api/v1/user/withdraw', {
      amount: amount,
    });
    console.log('response.data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};
