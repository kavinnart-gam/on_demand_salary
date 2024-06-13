import axios from '../../utils/axios';
import {signin} from '../signin';

jest.mock('../../utils/axios');

describe('signin services', () => {
  it('should successfully sign in and return data on valid response', async () => {
    const mockData = {token: 'some-token', user: {name: 'John Doe'}};
    axios.post.mockResolvedValueOnce({data: mockData});
    const response = await signin('083841494');
    expect(response).toEqual(mockData);
    expect(axios.post).toHaveBeenCalledWith('/api/v1/signin', {
      phone: '083841494',
    });
  });

  it('should throw error on failed request', async () => {
    const mockError = new Error('Network Error');
    axios.post.mockRejectedValueOnce(mockError);

    try {
      await signin('083841494');
      fail('Signin should have thrown an error');
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(axios.post).toHaveBeenCalledWith('/api/v1/signin', {
        phone: '083841494',
      });
    }
  });
});
