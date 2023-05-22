import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import { H2OButton } from "..";
import { SvgEnum } from "../../utils";

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  onClose?: (...args: any[]) => void;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const H2OModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  onClose,
  children,
  style,
}) => {
  const closeModal = () => {
    setVisible(false);
    onClose && onClose();
  };
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      style={styles.container}
      onBackdropPress={closeModal}
    >
      <View style={{ ...styles.innerContainer, ...style }}>
        <H2OButton
          style={styles.closeButton}
          testID="h2o-modal-button"
          svg={SvgEnum.Close}
          onPress={closeModal}
        />

        {children}
      </View>
    </Modal>
  );
};

export default H2OModal;
