import { Dimensions } from "react-native";
import moment from "moment-timezone";
import { LiquidUnit } from "./enums";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const getCurrentTime = moment().format();

const getIntakeAsMilliliters = (amount: number, unit: LiquidUnit): number => {
  const conversionFactors = {
    [LiquidUnit.Kiloliter]: 1000000,
    [LiquidUnit.Liter]: 1000,
    [LiquidUnit.Centiliter]: 100,
    [LiquidUnit.Milliliter]: 1,
  };

  const conversionFactor = conversionFactors[unit] ?? 1;
  return amount * conversionFactor;
};

const convertedTimestamp = (date: string) => date.slice(0, -5);
export {
  screenWidth,
  screenHeight,
  getCurrentTime,
  getIntakeAsMilliliters,
  convertedTimestamp,
};
