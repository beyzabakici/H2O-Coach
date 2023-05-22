import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { LiquidUnit } from "../../../utils";
import H2OUnitInput from "../index";

describe("H2OUnitInput", () => {
  it("calls setSelectedUnit when a unit item is pressed", () => {
    const mockSetSelectedUnit = jest.fn();

    const { getByText } = render(
      <H2OUnitInput
        selectedUnit={LiquidUnit.Milliliter}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const unitItem = getByText(LiquidUnit.Milliliter);
    fireEvent.press(unitItem);

    expect(mockSetSelectedUnit).toHaveBeenCalledWith(LiquidUnit.Milliliter);
  });
});
