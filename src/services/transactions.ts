import {axios} from '../utils';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get('/api/v1/user/transactions');
    return response.data;
  } catch (error) {
    console.error('Error during transactions: ', error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get('/api/v1/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error during profile: ', error);
    throw error;
  }
};

export const fetchAll = async () => {
  try {
    const [transactionsResponse, userResponse] = await Promise.all([
      fetchTransactions(),
      fetchUser(),
    ]);

    return {
      transactions: transactionsResponse,
      user: userResponse,
    };
  } catch (error) {
    console.error('Error during transaction, users fetching: ', error);
    throw error;
  }
};
