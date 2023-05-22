import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import H2OModal from "../index";

describe("H2OModal", () => {
  it("calls setVisible and onClose when the close button is pressed", () => {
    const mockSetVisible = jest.fn();
    const mockOnClose = jest.fn();

    const { getByTestId } = render(
      <H2OModal
        isVisible={true}
        setVisible={mockSetVisible}
        onClose={mockOnClose}
      />
    );

    const closeButton = getByTestId("h2o-modal-button");
    fireEvent.press(closeButton);

    expect(mockSetVisible).toHaveBeenCalledWith(false);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
