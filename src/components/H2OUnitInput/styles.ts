import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    paddingVertical: '2%',
    marginHorizontal: '5%',
    paddingBottom: '5%'
  },
  unitContainer: {
    padding: "1%",
    flexDirection: "row",
  },
  title: {
    paddingLeft: '2%',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.primaryBlue,
  },
  icon: {
    fontSize: 14,
    color: Colors.primaryBlue,
  },
  selectedUnitContainer:{
    backgroundColor: Colors.shadowPrimaryBlue,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primaryBlue
  },
  selected:{
    color: Colors.darkDarkestBlue
  }
});

export default styles;
