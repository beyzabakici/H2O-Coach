import React from "react";
import { FlatList, Text } from "react-native";
import H2OModal from "../../../../components/H2OModal";
import { SipResponseType } from "../../../../utils";
import { H2OCard } from "../../../../components";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  dayIntakes: SipResponseType[];
};

const DetailsModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  dayIntakes,
}) => {
  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <FlatList
        data={dayIntakes}
        renderItem={({ item }) => <H2OCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </H2OModal>
  );
};

export default DetailsModal;
