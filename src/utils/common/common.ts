import {jwtDecode} from 'jwt-decode';

const isExpireToken = (token: string): boolean => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const exp = decodedToken?.exp ?? 0;
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  }
  return true;
};

export default {
  isExpireToken,
};
