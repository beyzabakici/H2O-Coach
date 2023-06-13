import { StyleSheet } from "react-native";
import { Colors } from "../../../../utils";

const styles = StyleSheet.create({
  container: {
    paddingBottom: "8%",
  },
  icon: {
    fontSize: 20,
    color: Colors.primaryOrange,
  },
  infoArea: {
    flexDirection: "row",
    backgroundColor: Colors.shadowLightOrange,
    marginHorizontal: "30%",
    paddingVertical: "1%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingLeft: "2%",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
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
  title: {
    paddingLeft: "2%",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    color: Colors.primaryOrange,
  },
  buttonArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  scanButton: {
    backgroundColor: Colors.shadowPrimaryBlue,
    borderColor: Colors.darkSecondaryBlue,
  },
  scanButtonIcon: {
    fontSize: 20
  }
});

export default styles;
