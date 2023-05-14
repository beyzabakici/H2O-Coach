import React from "react";
import { FlatList } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import { IntakeResponseType } from "../../../../utils";
import { H2OCard } from "../../../../components";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  dayIntakes: IntakeResponseType[];
  deleteIntake: (...args: any[]) => void;
};

const RemoveModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  dayIntakes,
  deleteIntake,
}) => {
  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <FlatList
        data={dayIntakes}
        renderItem={({ item }) => (
          <H2OCard item={item} deleteIntake={() => deleteIntake(item.id)} />
        )}
        keyExtractor={(item) => `delete-intake-${item.id}`}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </H2OModal>
  );
};

export default RemoveModal;
