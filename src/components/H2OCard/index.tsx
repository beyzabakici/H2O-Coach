import React from "react";
import { ViewStyle, View, Text } from "react-native";
import styles from "./styles";
import { SipResponseType, SvgEnum } from "../../utils";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import H2OButton from "../H2OButton";

type Props = {
  style?: ViewStyle;
  item: SipResponseType;
  deleteIntake?: (...args: any[]) => void;
};

const H2OCard: React.FC<Props> = ({ style, item, deleteIntake }) => {
  const formatedDate = moment.utc(item.createdAt).format("HH:mm");
  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.innerContainer}>
        <Ionicons name={SvgEnum.Sip} style={styles.icon} />
        <Text style={styles.title}>{item.amount}</Text>
        <Text style={styles.title}>{item.unit}</Text>
      </View>
      <Text style={styles.title}>{formatedDate}</Text>
      {deleteIntake && (
        <H2OButton onPress={deleteIntake} iconStyle={styles.deleteIcon} />
      )}
    </View>
  );
};

export default H2OCard;
