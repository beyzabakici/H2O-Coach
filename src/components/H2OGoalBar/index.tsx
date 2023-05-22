import React, { useEffect, useMemo } from "react";
import { View, Text, StyleProp, ViewStyle, Share } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  Colors,
  LiquidUnit,
  SvgEnum,
  appURL,
  screenWidth,
  shareText,
} from "../../utils";
import styles from "./styles";
import H2OButton from "../H2OButton";
import { setError } from "../../redux/features/intakeSlice";

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

  const onPressShare = async () => {
    const shareOptions = {
      title: "H2O Coach",
      failOnCancel: false,
      urls: appURL,
    };

    try {
      await Share.share({
        ...shareOptions,
        message: shareText,
      });
    } catch (error) {
      setError(error);
    }
  };

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
      <H2OButton
        testID="h2o-goalbar-button"
        onPress={onPressShare}
        svg={SvgEnum.Share}
        style={styles.share}
      />
    </View>
  );
};

export default H2OGoalBar;
