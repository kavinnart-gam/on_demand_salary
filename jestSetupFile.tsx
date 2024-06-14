import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {cleanup} from '@testing-library/react-native';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-vector-icons/AntDesign', () => ({
  Icon: jest.fn(),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    navigation: {
      navigate: jest
        .fn()
        .mockImplementation((config, screenName) => screenName),
    },
  })),
}));
jest.mock('react-native-otp-inputs', () => jest.fn());
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    navigation: {
      navigate: jest
        .fn()
        .mockImplementation((config, screenName) => screenName),
    },
  })),
}));

jest.mock('react-native-elements', () => ({
  Avatar: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
