import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

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
    marginLeft: '2%',
  },
  buttonIcon: {
    color: Colors.primaryOrange,
    paddingVertical: "0.5%",
    marginHorizontal: "2%",
  },
  container: {
    flex: 1,
  },
  calendar: {
    marginHorizontal: "5%",
    marginVertical: "5%",
  },
  goalArea: {
    flex: 0.8,
    justifyContent: "center",
  },
  buttonArea: {
    flexDirection: "row",
    alignSelf: 'center',
    marginTop: "5%",
  },
});

export default styles;
