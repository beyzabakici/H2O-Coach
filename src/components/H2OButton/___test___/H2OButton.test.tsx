import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SvgEnum } from "../../../utils";
import H2OButton from "../index";

describe("H2OButton", () => {
  const onPressMock = jest.fn();

  const props = {
    style: { backgroundColor: "red" },
    onPress: onPressMock,
    rightText: "Hello",
    svg: SvgEnum.Add,
    iconStyle: { color: "blue" },
    textStyle: { fontSize: 24 },
    testID: "H2OButton",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<H2OButton {...props} />);

    const touchable = getByTestId(props.testID);
    const text = getByText(props.rightText);
    const icon = getByTestId("H2OButton");

    expect(touchable).toBeDefined();
    expect(text).toBeDefined();
    expect(icon).toBeDefined();

    fireEvent.press(touchable);
    expect(onPressMock).toHaveBeenCalled();
  });
});
