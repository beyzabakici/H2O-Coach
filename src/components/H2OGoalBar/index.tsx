import React, { useEffect, useMemo } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors, LiquidUnit, screenWidth } from "../../utils";
import styles from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  goal: number;
  amount: number;
  unit?: LiquidUnit;
};

const H2OGoalBar: React.FC<Props> = ({
  style,
  amount,
  goal,
  unit = LiquidUnit.Milliliter,
}) => {
  const progressPercent = useMemo(
    () => goal && amount && Math.round((amount * 100) / goal),
    [amount, goal]
  );

  useEffect(() => {
    // Perform any side effects related to progress percent changes here
  }, [progressPercent]);

  const renderGoalReached = () => {
    if (amount >= goal) {
      return <Text>Goal Reached! 🎉 </Text>;
    }
    return null;
  };
  
  return (
    <View style={[styles.container, style]}>
      <AnimatedCircularProgress
        size={screenWidth * 0.55}
        width={6}
        fill={progressPercent || 0}
        tintColor={Colors.primaryBlue}
        backgroundColor={Colors.primaryDarkBlue}
      >
        {() => (
          <View style={styles.childrenArea}>
            {renderGoalReached()}
            <Text style={styles.points}>{progressPercent} %</Text>
            <Text>
              {amount} / {goal} {unit}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default H2OGoalBar;
