import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    minWidth: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '0.5%',
    marginHorizontal: '2%',
  },
  icon: {
    fontSize: 30,
    color: Colors.primaryOrange
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