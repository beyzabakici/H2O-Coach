import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import H2OCard from "../index";
import { IntakeResponseType, LiquidUnit } from "../../../utils";

describe("H2OCard", () => {
  const item: IntakeResponseType = {
    createdAt: "2023-05-22T10:30:00.000Z",
    amount: 250,
    unit: LiquidUnit.Milliliter,
    id: "1",
  };

  it("renders correctly", () => {
    const { getByText } = render(<H2OCard item={item} />);
    const amountText = getByText("250");
    const unitText = getByText("ml");
    const formatedDateText = getByText("10:30");
    expect(amountText).toBeDefined();
    expect(unitText).toBeDefined();
    expect(formatedDateText).toBeDefined();
  });

  it("calls deleteIntake callback when delete button is pressed", () => {
    const mockDeleteIntake = jest.fn();
    const { getByTestId } = render(
      <H2OCard item={item} deleteIntake={mockDeleteIntake} />
    );
    const deleteButton = getByTestId("H2O-Card-Button");
    fireEvent.press(deleteButton);
    expect(mockDeleteIntake).toHaveBeenCalled();
  });
});
