import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import H2OCalendar from "../index";

describe("H2OCalendar", () => {
  const markedDates = {
    "2023-05-01": { marked: true },
    "2023-05-15": { marked: true },
  };

  it("renders correctly", () => {
    const { getByTestId } = render(<H2OCalendar />);
    const calendarComponent = getByTestId("H2O-Calendar");
    expect(calendarComponent).toBeDefined();
  });
  it("calls onDayPress callback correctly", () => {
    const mockOnDayPress = jest.fn();
    const { getByTestId } = render(<H2OCalendar onDayPress={mockOnDayPress} />);
    const calendarComponent = getByTestId("H2O-Calendar");
    fireEvent(calendarComponent, "onDayPress", { date: "2023-05-01" });
    expect(mockOnDayPress).toHaveBeenCalledWith({ date: "2023-05-01" });
  });
});
