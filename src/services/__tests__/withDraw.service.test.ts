import axios from '../../utils/axios';
import withDraw from '../withDraw';

jest.mock('../../utils/axios');

describe('withDraw services', () => {
  it('should successfully withdraw and return data on valid response', async () => {
    const mockData = {message: 'Withdrawal successful'};
    const withdrawAmount = '100';
    axios.post.mockResolvedValueOnce({data: mockData});

    const response = await withDraw(withdrawAmount);

    expect(response).toEqual(mockData);
    expect(axios.post).toHaveBeenCalledWith('/api/v1/user/withdraw', {
      amount: withdrawAmount,
    });
  });

  it('should throw error on failed withdrawal request', async () => {
    const mockError = new Error('Insufficient funds');
    const withdrawAmount = '1000';
    axios.post.mockRejectedValueOnce(mockError);

    try {
      await withDraw(withdrawAmount);
      fail('withDraw should have thrown an error');
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(axios.post).toHaveBeenCalledWith('/api/v1/user/withdraw', {
        amount: withdrawAmount,
      });
    }
  });
});
