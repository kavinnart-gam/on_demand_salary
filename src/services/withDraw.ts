import {axios} from '../utils';
import {withDrawValues} from '../interfaces/users';

export const withDraw = async ({amount}: withDrawValues) => {
  try {
    const response = await axios.post('/api/v1/user/withdraw', {
      amount: amount,
    });

    return response.data;
  } catch (error) {
    console.error('Error during withDraw: ', error);
    throw error;
  }
};
