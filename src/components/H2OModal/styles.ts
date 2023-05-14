import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  innerContainer: {
    maxHeight: '60%',
    minHeight: '20%',
    backgroundColor: Colors.white,
    borderRadius: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingRight: '2%',
    paddingTop: '2%'
  }
});

export default styles;
