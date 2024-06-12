import {axios} from '../../utils';
import {LoginFormValues} from '../../interfaces/users';

export const login = async ({phoneNumber}: LoginFormValues) => {
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
