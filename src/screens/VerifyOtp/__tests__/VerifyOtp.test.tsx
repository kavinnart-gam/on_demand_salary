import {render} from '@testing-library/react-native';
import VerifyOtpScreen from '../VerifyOtpScreen';

describe('VerifyOtp', () => {
  it('Verification screen is match snapshot', () => {
    const result = render(<VerifyOtpScreen />);
    expect(result).toMatchSnapshot();
  });

  it('VerifyOtpScreen component should be render correctly', () => {
    const {getByTestId} = render(<VerifyOtpScreen />);
    const inputOtp = getByTestId('INPUT_TXT_OTP');
    const textOtp = getByTestId('TXT_VERIFY_OTP');
    expect(inputOtp).toBeTruthy();
    expect(textOtp).toBeTruthy();
  });
});
