import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";
import { screenWidth } from "../../utils";

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: "space-around",
  },
  button: {
    borderWidth: 1.6,
    borderColor: Colors.shadowOrange,
    backgroundColor: Colors.buttonOrange,
    borderRadius: 25,
    marginLeft: "2%",
  },
  buttonIcon: {
    color: Colors.primaryOrange,
    paddingVertical: "0.5%",
    marginHorizontal: "2%",
  },
  goalArea: {
    flex: 0.8,
    justifyContent: "center",
  },
  buttonArea: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
  },
  loading: {
    alignSelf: "center",
    flex: 1,
    backgroundColor: Colors.white,
    width: screenWidth,
  },
  
  buttonx: {
    zIndex: 100,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#303940",
  },
  buttonText: {
    color: Colors.white,
  },
});

export default styles;
