import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import H2OGoalBar from "../index";
import { LiquidUnit } from "../../../utils";
import { Share } from "react-native";

describe("H2OGoalBar", () => {
  const goal = 2000;
  const amount = 1500;
  const unit = LiquidUnit.Milliliter;

  it("renders correctly", () => {
    const { getByText } = render(
      <H2OGoalBar goal={goal} amount={amount} unit={unit} />
    );
    const progressText = getByText("75 %");
    const amountText = getByText("1500 / 2000 ml");
    expect(progressText).toBeDefined();
    expect(amountText).toBeDefined();
  });

  it("calls onPressShare when share button is pressed", async () => {
    const mockOnPressShare = jest.fn();
    const mockShare = jest.spyOn(Share, "share").mockImplementation(() => {
      mockOnPressShare();
      return Promise.resolve();
    });

    const { getByTestId } = render(<H2OGoalBar goal={0} amount={0} />);

    const shareButton = getByTestId("h2o-goalbar-button");
    fireEvent.press(shareButton);

    expect(mockOnPressShare).toHaveBeenCalled();

    mockShare.mockRestore();
  });
});
