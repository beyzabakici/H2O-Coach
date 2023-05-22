import React from "react";
import { ViewStyle } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import { Colors } from "../../utils";

type Props = {
  style?: ViewStyle;
  markedDates?: any;
  onDayPress?: (...args: any[]) => void;
};

const H2OCalendar: React.FC<Props> = ({ style, markedDates, onDayPress }) => {
  return (
    <Calendar
      testID="H2O-Calendar"
      style={{ ...style, ...styles.calendar }}
      markedDates={markedDates}
      onDayPress={onDayPress}
      theme={{
        calendarBackground: "transparent",
        selectedDayBackgroundColor: Colors.darkBlue,
        todayTextColor: Colors.secondaryBlue,
        dayTextColor: Colors.primaryDarkBlue,
        dotColor: Colors.primaryBlue,
        selectedDotColor: Colors.white,
        arrowColor: Colors.primaryOrange,
        monthTextColor: Colors.primaryOrange,
      }}
    />
  );
};

export default H2OCalendar;
