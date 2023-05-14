import React, { useEffect, useState } from "react";
import { ViewStyle, View, Text } from "react-native";
import styles from "./styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors, LiquidUnit, screenWidth } from "../../utils";

type Props = {
  style?: ViewStyle;
  goal: number;
  amount: number;
  unit: LiquidUnit;
};

const H2OGoalBar: React.FC<Props> = ({ style, amount, goal, unit }) => {
  const [progressPercent, setProgressPercent] = useState(1);

  useEffect(() => {
    setProgressPercent(Math.round((amount * 100) / goal));
  }, [goal, amount]);

  return (
    <View style={{ ...styles.container, ...style }}>
      {progressPercent ? (
        <AnimatedCircularProgress
          size={screenWidth * 0.55}
          width={6}
          fill={progressPercent}
          tintColor={Colors.primaryBlue}
          backgroundColor={Colors.primaryDarkBlue}
        >
          {() => (
            <View style={styles.childrenArea}>
              <Text style={styles.points}>{progressPercent} %</Text>
              <Text>
                {amount} / {goal} {unit ?? LiquidUnit.Milliliter}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      ): <></>}
    </View>
  );
};

export default H2OGoalBar;
