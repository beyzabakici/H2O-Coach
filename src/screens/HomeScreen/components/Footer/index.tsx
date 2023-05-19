import React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./styles";
import { H2OCalendar } from "../../../../components";
import { IntakeResponseType } from "../../../../utils";
import { useAppSelector } from "../../../../redux";

type Props = {
  setSelectedDayIntakes: (...args: any[]) => void;
  setDetailsModalVisible: (...args: any[]) => void;
  markedDates: any;
};

const Footer: React.FC<Props> = ({
  setSelectedDayIntakes,
  setDetailsModalVisible,
  markedDates,
}) => {
  const { data } = useAppSelector((state) => state.intakes);
  const onDayPress = (selectedDay: any) => {
    const selectedDays = data.filter(
      (day: IntakeResponseType) =>
        day.createdAt.slice(0, 10) === selectedDay.dateString
    );
    setSelectedDayIntakes(selectedDays);
    setDetailsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <H2OCalendar
        style={styles.calendar}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
    </View>
  );
};

export default Footer;
