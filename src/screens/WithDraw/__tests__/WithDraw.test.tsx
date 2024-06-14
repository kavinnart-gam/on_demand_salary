import {render, fireEvent} from '@testing-library/react-native';
import WithDrawScreen from '../WithDrawScreen';

jest.mock('../../../utils/axios');
jest.mock('../../../services/withDraw');

describe('WithDraw', () => {
  it('should be render correctly', () => {
    const result = render(<WithDrawScreen />);
    const inputWithDraw = result.getByTestId('INPUT_TXT_WITH_DRAW');
    const buttonWithDraw = result.getByTestId('BTN_WITH_DRAW');
    expect(inputWithDraw).toBeTruthy();
    expect(buttonWithDraw).toBeTruthy();
  });

  it('When fill amount withdraw button can be enable', () => {
    const {getByTestId} = render(<WithDrawScreen />);

    const buttonWithDraw = getByTestId('BTN_WITH_DRAW');
    expect(buttonWithDraw.props.style.backgroundColor).toEqual('#E5EAEF');

    const inputWithDraw = getByTestId('INPUT_TXT_WITH_DRAW');
    fireEvent.changeText(inputWithDraw, '100');
    expect(buttonWithDraw.props.style.backgroundColor).toEqual('#000000');
  });
});
