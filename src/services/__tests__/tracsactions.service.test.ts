import axios from '../../utils/axios';
import {fetchTransactions, fetchUser} from '../transactions';

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

  it('fetches user data successfully', async () => {
    const mockData = {name: 'John Doe', email: 'johndoe@example.com'};
    axios.get.mockResolvedValueOnce({data: mockData}); // Mock successful response

    const userData = await fetchUser();

    expect(axios.get).toHaveBeenCalledWith('/api/v1/user/profile'); // Assert API call
    expect(userData).toEqual(mockData); // Assert returned data
  });

  it('handles errors gracefully', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValueOnce(mockError); // Mock error response

    expect.assertions(1); // Specify the number of assertions (optional)

    try {
      await fetchUser();
    } catch (error) {
      expect(error).toEqual(mockError); // Assert caught error
    }
  });
});
