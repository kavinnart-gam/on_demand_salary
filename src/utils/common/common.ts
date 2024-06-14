import {jwtDecode} from 'jwt-decode';
import {Platform} from 'react-native';

const isExpireToken = (token: string): boolean => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const exp = decodedToken?.exp ?? 0;
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  }
  return true;
};

const urlConfig = (): string => {
  const iosUrl = 'http://localhost:3000';
  const androidUrl = 'http://10.0.2.2:3000';
  const url = Platform.OS === 'ios' ? iosUrl : androidUrl;
  return url;
};

const testID = (id: string | undefined): any => ({
  accessible: true,
  accessibilityLabel: id,
  testID: id,
});

export default {
  isExpireToken,
  urlConfig,
  testID,
};
