import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "8%",
    marginVertical: "4%",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.primaryDarkBlue,
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: 'space-between',
    paddingHorizontal: '2%'
  },
  removeButton: {
    alignItems: "flex-start",
  },
  addButton: {
    alignItems: "flex-end",
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: '2%',
    color: Colors.primaryOrange,
  },
  textInput: {
    width: '50%',
    textAlign: 'right',
    fontSize: 14,
  },
  unitText:{
    paddingLeft: '2%',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
