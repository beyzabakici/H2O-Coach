import { Dimensions } from "react-native";
import moment from 'moment-timezone';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const getCurrentTime = moment().format();

export { screenWidth, screenHeight, getCurrentTime };
