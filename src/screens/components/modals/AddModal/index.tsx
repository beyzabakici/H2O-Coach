import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import {
  IntakeRequestType,
  LiquidUnit,
  SvgEnum,
  getCurrentTime,
  getIntakeAsMilliliters,
} from "../../../../utils";
import { H2OButton, H2OGoalInput, H2OUnitInput } from "../../../../components";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  addIntake: (...args: any[]) => void;
};

const AddModal: React.FC<Props> = ({ isVisible, setVisible, addIntake }) => {
  const [intake, setIntake] = useState<IntakeRequestType>({
    amount: 0,
    createdAt: "",
    unit: LiquidUnit.Milliliter,
  });
  const onPressAdd = () => {
    addIntake({
      createdAt: getCurrentTime,
      amount: getIntakeAsMilliliters(intake.amount, intake.unit).toString(),
      unit: LiquidUnit.Milliliter,
    });
    setVisible(!isVisible);
  };
  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <H2OGoalInput
        title={"amount"}
        currentValue={intake.amount}
        setCurrentValue={(value: any) => setIntake({ ...intake, amount: value })}
        unit={intake.unit}
      />
      <Text style={styles.title}>Unit</Text>
      <H2OUnitInput
        selectedUnit={intake.unit}
        setSelectedUnit={(value) => setIntake({ ...intake, unit: value })}
      />

      <View style={styles.infoArea}>
        <Ionicons name={SvgEnum.Info} style={styles.icon} />
        <Text style={styles.text}>1000 ml = 1 lt</Text>
      </View>

      <H2OButton
        style={styles.button}
        rightText="add"
        textStyle={styles.buttonText}
        onPress={onPressAdd}
      />
    </H2OModal>
  );
};

export default AddModal;
