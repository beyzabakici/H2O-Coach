import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import { ProfileResponseType, SvgEnum } from "../../../../utils";
import { H2OButton, H2OGoalInput } from "../../../../components";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  profile: ProfileResponseType;
};

const SettingsModal: React.FC<Props> = ({ isVisible, setVisible, profile }) => {
  const [dailyGoal, setDailyGoal] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [monthlyGoal, setMonthlyGoal] = useState(0);

  useEffect(() => {
    setDailyGoal(profile?.dailyGoal);
    setWeeklyGoal(profile?.weeklyGoal);
    setMonthlyGoal(profile?.monthlyGoal);
  }, [profile]);

  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <H2OGoalInput
        title={"daily Goal"}
        currentValue={dailyGoal}
        setCurrentValue={setDailyGoal}
      />
      <H2OGoalInput
        title={"weekly Goal"}
        currentValue={weeklyGoal}
        setCurrentValue={setWeeklyGoal}
      />
      <H2OGoalInput
        title={"monthly Goal"}
        currentValue={monthlyGoal}
        setCurrentValue={setMonthlyGoal}
      />
      <View style={styles.infoArea}>
        <Ionicons name={SvgEnum.Info} style={styles.icon} />
        <Text style={styles.text}>1000 ml = 1 lt</Text>
      </View>

      <H2OButton
        style={styles.button}
        rightText="save"
        textStyle={styles.buttonText}
        onPress={() => console.log(dailyGoal, weeklyGoal, monthlyGoal)}
      />
    </H2OModal>
  );
};

export default SettingsModal;
