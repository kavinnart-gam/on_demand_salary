import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {cleanup} from '@testing-library/react-native';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
