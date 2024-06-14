import {axios} from '../utils';

const withDraw = async (amount: string) => {
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

export default withDraw;
