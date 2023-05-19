import React from "react";
import { FlatList, Text } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import { IntakeResponseType, LiquidUnit } from "../../../../utils";
import { H2OCard } from "../../../../components";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  dayIntakes: IntakeResponseType[];
};

const DetailsModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  dayIntakes,
}) => {
  const dailyIntake = dayIntakes.reduce(
    (total, intake) => (intake.amount ? total + Number(intake.amount) : 0),
    0
  );
  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <FlatList
        data={dayIntakes}
        renderItem={({ item }) => <H2OCard item={item} />}
        keyExtractor={(item) => `intake-${item.id}`}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={true}
        ListFooterComponent={() => (
          <Text
            style={styles.dailyIntakeInfo}
          >{`Daily Intake: ${dailyIntake} ${LiquidUnit.Milliliter}`}</Text>
        )}
      />
    </H2OModal>
  );
};

export default DetailsModal;
