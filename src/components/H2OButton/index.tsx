import React from "react";
import styles from "./styles";
import { Text, ViewStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonEnum } from "../../utils";

type Props = {
  style?: ViewStyle;
  onPress: (...args: any[]) => void;
  rightText?: string;
  svg?: ButtonEnum;
};

const H2OGoalBar: React.FC<Props> = ({
  style,
  onPress,
  rightText = "",
  svg = undefined,
}) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.container }}
      onPress={onPress}
    >
      {svg && <Ionicons name={svg} style={styles.icon} />}
      {rightText && <Text style={styles.text}>{rightText}</Text>}
    </TouchableOpacity>
  );
};

export default H2OGoalBar;
