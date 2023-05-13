import { StyleSheet } from "react-native";
import { Colors, screenWidth } from "../../utils";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
  },
  points: {
    textAlign: "center",
    color: Colors.primaryBlue,
    fontSize: 50,
    fontWeight: '400',
  },
  childrenArea: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.darkBlue,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 1,  
    elevation: 4
  },
});

export default styles;
