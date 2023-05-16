import React, { useState } from "react";
import { View, Text, TextInput, ViewStyle } from "react-native";
import styles from "./styles";
import H2OButton from "../H2OButton";
import { SvgEnum, LiquidUnit } from "../../utils";

interface Props {
  title: string;
  currentValue: number;
  setCurrentValue: (...args: any[]) => void;
  style?: ViewStyle;
  unit?: LiquidUnit;
}

const H2OGoalInput: React.FC<Props> = ({
  title,
  currentValue,
  setCurrentValue,
  style,
  unit = LiquidUnit.Milliliter,
}) => {
  const increaseValue = () => setCurrentValue(currentValue + 1);
  const reduceValue = () => setCurrentValue(currentValue - 1);

  const handleValueChange = (value: string) => {
    if (/^\d+$/.test(value)) {
      setCurrentValue(parseInt(value));
    }
  };

  return (
    <View testID="H2OGoalInput" style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.innerContainer}>
        <H2OButton
          style={styles.removeButton}
          svg={SvgEnum.Remove}
          onPress={reduceValue}
        />
        <View style={styles.textArea}>
          <TextInput
            style={styles.textInput}
            onChangeText={handleValueChange}
            value={currentValue.toString()}
            keyboardType="numeric"
            placeholder={currentValue.toString()}
          />
          <Text style={styles.unitText}>{unit}</Text>
        </View>
        <H2OButton
          style={styles.addButton}
          svg={SvgEnum.Add}
          onPress={increaseValue}
        />
      </View>
    </View>
  );
};

export default H2OGoalInput;
