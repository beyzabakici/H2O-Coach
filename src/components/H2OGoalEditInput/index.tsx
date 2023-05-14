import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import H2OButton  from "../H2OButton";
import { SvgEnum, LiquidUnit } from "../../utils";

type Props = {
  title: string;
  currentValue: number;
  setValue: (...args: any[]) => void;
};

const H2OGoalInput: React.FC<Props> = ({ title, currentValue }) => {
  const [value, setValue] = useState<number>(currentValue);
  const increaseValue = () => {
    setValue(value + 1);
  };
  const reduceValue = () => {
    setValue(value - 1);
  };
  return (
    <View style={styles.container}>
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
            onChangeText={(value) => setValue(parseInt(value))}
            value={value.toString()}
            keyboardType="numeric"
            placeholder={value.toString()}
          />
          <Text style={styles.unitText}>{LiquidUnit.Milliliter}</Text>
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
