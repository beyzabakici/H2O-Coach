import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  innerContainer: {
    minHeight: '50%',
    backgroundColor: Colors.white,
    borderRadius: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
  }
});

export default styles;
