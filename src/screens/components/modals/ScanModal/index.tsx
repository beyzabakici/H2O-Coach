import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import H2OModal from "../../../../components/H2OModal";
import styles from "./styles";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Constants from "expo-constants";
import { AppConfig } from "../../../../../app.config";
import { H2OButton } from "../../../../components";
const { PRODUCT_URL } = (Constants.manifest?.extra as AppConfig) || {};

type Props = {
  isVisible: boolean;
  setVisible: (...args: any[]) => void;
  scanned: boolean;
  setScanned: (...args: any[]) => void;
  onPressAdd: (...args: any[]) => void;
};

const ScanModal: React.FC<Props> = ({
  isVisible,
  setVisible,
  scanned,
  setScanned,
  onPressAdd,
}) => {
  const [scannedAmount, setScannedAmount] = useState<string>("");

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    await axios
      .post(`${PRODUCT_URL}product/${data}`)
      .then(async (resp) =>
        !!resp.data.product_quantity
          ? setScannedAmount(resp.data.product_quantity)
          : await Alert.alert("Error", "Product not found !", [
              { text: "OK", onPress: () => onPressAdd(scannedAmount) },
            ])
      )
      .catch((err) => console.log("er", err));
  };

  return (
    <H2OModal
      isVisible={isVisible}
      setVisible={setVisible}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.helpTextWrapper}>
          <Text style={styles.helpText}>Scan the bottle's Barcode</Text>
        </View>
        <Animatable.View
          style={styles.scannerView}
          animation={scanned ? "fadeOut" : "pulse"}
          iterationCount={scanned ? 1 : "infinite"}
        >
          <BarCodeScanner
            style={{ flex: 1, borderRadius: 30, backgroundColor: "pink" }}
            onBarCodeScanned={handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
          >
            <View style={styles.borderTopLeft} />
            <View style={styles.borderTopRight} />
            <View style={styles.borderBottomLeft} />
            <View style={styles.borderBottomRight} />
          </BarCodeScanner>
        </Animatable.View>
      </View>
      {!!scannedAmount && (
        <H2OButton
          style={styles.button}
          rightText="add"
          textStyle={styles.buttonText}
          onPress={() => onPressAdd(scannedAmount)}
        />
      )}
    </H2OModal>
  );
};

export default ScanModal;
