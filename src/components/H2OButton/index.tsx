import React from "react";
import styles from "./styles";
import { Text, ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SvgEnum } from "../../utils";

type Props = {
  style?: ViewStyle;
  onPress: (...args: any[]) => void;
  rightText?: string;
  svg?: SvgEnum;
  iconStyle?: ViewStyle | TextStyle;
  textStyle?: TextStyle;
};

const H2OGoalBar: React.FC<Props> = ({
  style,
  onPress,
  rightText = "",
  svg = undefined,
  iconStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.container }}
      onPress={onPress}
    >
      {svg && <Ionicons name={svg} style={{ ...styles.icon, ...iconStyle }} />}
      {rightText && (
        <Text style={{ ...styles.text, ...textStyle }}>{rightText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default H2OGoalBar;
