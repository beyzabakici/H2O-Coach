import { StyleSheet } from "react-native";
import { Colors, screenHeight } from "../../../../utils";

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.5,
  },
  scannerView: {
    width: 220,
    height: 110,
    alignSelf: "center",
  },
  borderTopLeft: {
    position: "absolute",
    borderColor: Colors.primaryBlue,
    width: 55,
    height: 55,
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
  },
  borderTopRight: {
    position: "absolute",
    borderColor: Colors.primaryBlue,
    width: 55,
    height: 55,
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
  },
  borderBottomLeft: {
    position: "absolute",
    borderColor: Colors.primaryBlue,
    width: 55,
    height: 55,
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
  },
  borderBottomRight: {
    position: "absolute",
    borderColor: Colors.primaryBlue,
    width: 55,
    height: 55,
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  helpTextWrapper: {
    padding: 15,
    alignItems: "center",
  },
  helpText: {
    color: Colors.primaryBlue,
  },
  button: {
    backgroundColor: Colors.shadowLightOrange,
    borderColor: Colors.shadowOrange,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
    marginTop: "5%",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primaryOrange,
  },
});

export default styles;
