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
    backgroundColor: Colors.backgroundColor,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  share: {
    alignSelf: 'flex-end',
    marginTop: -28,
    marginLeft: -20,
  }
});

export default styles;
