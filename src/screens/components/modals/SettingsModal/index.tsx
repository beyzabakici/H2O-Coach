import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import { GoalsResponseType, SvgEnum } from "../../../../utils";
import { H2OButton, H2OGoalInput } from "../../../../components";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  profile: GoalsResponseType;
  onSavePress: (...args: any[]) => void;
};

const SettingsModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  profile,
  onSavePress,
}) => {
  const [goals, setGoals] = useState<GoalsResponseType>({
    dailyGoal: 1,
    weeklyGoal: 1,
    monthlyGoal: 1,
    userId: "1",
  });

  useEffect(() => {
    setGoals(profile);
  }, [profile]);

  const handleButton = () => {
    onSavePress(goals);
    setVisible(false);
  };

  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <H2OGoalInput
        title={"daily Goal"}
        currentValue={goals?.dailyGoal}
        setCurrentValue={(value: string) =>
          setGoals({ ...goals, dailyGoal: parseInt(value) })
        }
      />
      <H2OGoalInput
        title={"weekly Goal"}
        currentValue={goals?.weeklyGoal}
        setCurrentValue={(value: string) =>
          setGoals({ ...goals, weeklyGoal: parseInt(value) })
        }
      />
      <H2OGoalInput
        title={"monthly Goal"}
        currentValue={goals?.monthlyGoal}
        setCurrentValue={(value: string) =>
          setGoals({ ...goals, monthlyGoal: parseInt(value) })
        }
      />
      <View style={styles.infoArea}>
        <Ionicons name={SvgEnum.Info} style={styles.icon} />
        <Text style={styles.text}>1000 ml = 1 lt</Text>
      </View>

      <H2OButton
        style={styles.button}
        rightText="save"
        textStyle={styles.buttonText}
        onPress={handleButton}
      />
    </H2OModal>
  );
};

export default SettingsModal;
