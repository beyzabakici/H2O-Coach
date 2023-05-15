import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import H2OGoalInput from '../index';
import { Colors, LiquidUnit, SvgEnum } from '../../../utils';

describe('H2OGoalInput', () => {
  const props = {
    title: 'Test',
    currentValue: 10,
    setCurrentValue: jest.fn(),
    style: { backgroundColor: Colors.white },
    unit: LiquidUnit.Milliliter,
  };

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <H2OGoalInput {...props} />
    );
    expect(getByText(props.title)).toBeTruthy();
    expect(getByPlaceholderText(props.currentValue.toString())).toBeTruthy();
    expect(getByText(props.unit)).toBeTruthy();
  });

  it('increases and decreases value correctly', () => {
    const { getByTestId } = render(<H2OGoalInput {...props} />);
    const decreaseButton = getByTestId(`button-${SvgEnum.Remove}`);
    const increaseButton = getByTestId(`button-${SvgEnum.Add}`);

    fireEvent.press(decreaseButton);
    expect(props.setCurrentValue).toHaveBeenCalledWith(props.currentValue - 1);

    fireEvent.press(increaseButton);
    expect(props.setCurrentValue).toHaveBeenCalledWith(props.currentValue + 1);
  });

  it('updates value correctly on text input change', () => {
    const { getByPlaceholderText } = render(<H2OGoalInput {...props} />);
    const input = getByPlaceholderText(props.currentValue.toString());

    act(() => {
      fireEvent.changeText(input, '20');
    });
    expect(props.setCurrentValue).toHaveBeenCalledWith(20);
  });

  it('does not update value on invalid text input change', () => {
    const { getByPlaceholderText } = render(<H2OGoalInput {...props} />);
    const input = getByPlaceholderText(props.currentValue.toString());

    act(() => {
      fireEvent.changeText(input, 'abc');
    });
    expect(props.setCurrentValue).not.toHaveBeenCalled();
  });
});
