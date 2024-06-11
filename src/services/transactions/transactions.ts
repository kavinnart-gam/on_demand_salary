import axios from '../../utils/axios';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get('/api/v1/user/transactions');
    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    throw error;
  }
};
