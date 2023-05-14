import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "5%",
    marginHorizontal: "5%",
    marginVertical: "2%",
    borderRadius: 10,
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    backgroundColor: Colors.shadowPrimaryBlue,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.darkDarkestBlue,
    paddingLeft: "1%",
  },
  icon: {
    fontSize: 20,
    color: Colors.darkBlue,
  },
  deleteIcon: {
    fontSize: 20,
    color: Colors.primaryRed,
  },
  innerContainer: {
    flexDirection: "row",
  },
});

export default styles;
