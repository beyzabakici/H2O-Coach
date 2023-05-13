import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1.6,
    borderColor: Colors.primaryDarkBlue,
    borderRadius: 25,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 1,  
    elevation: 4
  },
});

export default styles;