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
  testID?: string;
};

const H2OButton: React.FC<Props> = ({
  style,
  onPress,
  rightText = "",
  svg = undefined,
  iconStyle = {},
  textStyle = {},
  testID = "H2OButton",
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      style={{ ...style, ...styles.container }}
      onPress={onPress}
    >
      {svg && <Ionicons testID="H2OButtonIcon" name={svg} style={{ ...styles.icon, ...iconStyle }} />}
      {rightText && (
        <Text style={{ ...styles.text, ...textStyle }}>{rightText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default H2OButton;
