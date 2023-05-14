import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    color: Colors.darkSecondaryBlue,
  },
  text: {
    color: Colors.primaryDarkBlue,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    textTransform:'uppercase',
    paddingLeft: '1%'
  }
});

export default styles;