import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  screenContainer: { backgroundColor: Colors.backgroundColor, flex: 1, justifyContent: 'space-around' },
  button: {
    borderWidth: 1.6,
    borderColor: Colors.shadowOrange,
    backgroundColor: Colors.buttonOrange,
    borderRadius: 25,
    shadowColor: Colors.shadowOrange,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 1,  
    elevation: 4
  },
  container: {
    flex:1,
  },
  calendar: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  goalArea: {
    flex:0.8,
    justifyContent: 'center',
  },
  buttonArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: '5%'
  }
});

export default styles;