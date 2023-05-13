import React from "react";
import { ViewStyle, View, Text } from "react-native";
import styles from "./styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors, LiquidUnit, screenWidth } from "../../utils";

type Props = {
  style?: ViewStyle;
  goal: number;
  amount: number;
  unit: LiquidUnit
};

const H2OGoalBar: React.FC<Props> = ({ style, amount, goal, unit }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <AnimatedCircularProgress
        size={screenWidth * 0.6}
        width={6}
        fill={Math.round((amount * 100) / goal)}
        tintColor={Colors.primaryBlue}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        ref={null}
        backgroundColor={Colors.primaryDarkBlue}
        arcSweepAngle={360}
      >
        {(fill) => (
          <View style={styles.childrenArea}>
            <Text style={styles.points}>
              {Math.round((amount * 100) / goal)}%
            </Text>
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
