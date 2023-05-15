import React from "react";
import { TouchableOpacity, View, ViewStyle, Text } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import { H2OButton } from "..";
import { LiquidUnit, SvgEnum } from "../../utils";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  selectedUnit: LiquidUnit | String;
  setSelectedUnit: (...args: any[]) => void;
  style?: ViewStyle;
};

type UnitItemProps = {
  unit: LiquidUnit;
  isSelected: boolean;
  setSelected: (...args: any[]) => void;
};

const UnitItem: React.FC<UnitItemProps> = ({
  unit,
  isSelected,
  setSelected,
}) => {
  return (
    <TouchableOpacity
      style={
        isSelected
          ? { ...styles.unitContainer, ...styles.selectedUnitContainer }
          : styles.unitContainer
      }
      onPress={() => setSelected(unit)}
    >
      <Ionicons
        name={SvgEnum.Intake}
        style={
          isSelected ? { ...styles.icon, ...styles.selected } : styles.icon
        }
      />
      <Text
        style={
          isSelected ? { ...styles.title, ...styles.selected } : styles.title
        }
      >
        {unit}
      </Text>
    </TouchableOpacity>
  );
};

const H2OUnitInput: React.FC<Props> = ({
  selectedUnit,
  setSelectedUnit,
  style,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {Object.values(LiquidUnit).map((e, index) => (
        <UnitItem
          unit={e}
          key={`unit-item-key${index}`}
          isSelected={e === selectedUnit}
          setSelected={setSelectedUnit}
        />
      ))}
    </View>
  );
};

export default H2OUnitInput;
