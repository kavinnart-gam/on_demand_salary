import axios from '../../utils/axios';
import {fetchAll, fetchTransactions, fetchUser} from '../transactions';

jest.mock('../../utils/axios');

describe('transactions services', () => {
  it('should successfully fetch transactions on valid response', async () => {
    const mockTransactions = [
      {id: 1, type: 'debit', amount: 100},
      {id: 2, type: 'credit', amount: 50},
    ];
    axios.get.mockResolvedValueOnce({data: mockTransactions});

    const response = await fetchTransactions();

    expect(response).toEqual(mockTransactions);
    expect(axios.get).toHaveBeenCalledWith('/api/v1/user/transactions');
  });

  it('should throw error on failed fetch request', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValueOnce(mockError);

    try {
      await fetchTransactions();
      fail('fetchTransactions should have thrown an error');
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(axios.get).toHaveBeenCalledWith('/api/v1/user/transactions');
    }
  });
});
