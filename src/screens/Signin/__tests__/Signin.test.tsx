import {render, fireEvent} from '@testing-library/react-native';
import SigninScreen from '../SigninScreen';
describe('Signin', () => {
  it('Sign screen is match snapshot', () => {
    const result = render(<SigninScreen />);
    expect(result).toMatchSnapshot();
  });

  it('Sign screen component should be render correctly', () => {
    const {getByTestId} = render(<SigninScreen />);
    const buttonSignin = getByTestId('BTN_SIGN_IN');
    const inputMobileNumber = getByTestId('INPUT_TXT_MOBILE_NUMBER');

    expect(buttonSignin).toBeTruthy();
    expect(inputMobileNumber).toBeTruthy();
  });

  it('When fill phone number signin button can be enable', () => {
    const {getByTestId} = render(<SigninScreen />);

    const buttonSignin = getByTestId('BTN_SIGN_IN');
    expect(buttonSignin.props.style.backgroundColor).toEqual('#E5EAEF');

    const inputMobileNumber = getByTestId('INPUT_TXT_MOBILE_NUMBER');
    fireEvent.changeText(inputMobileNumber, '0835654787');
    expect(buttonSignin.props.style.backgroundColor).toEqual('#000000');
  });
});
