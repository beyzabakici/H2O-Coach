import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import styles from "./styles";
import { H2OButton, H2OCalendar } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import { ButtonEnum, LiquidUnit, SipResponseType } from "../../utils";
import { add, fetchSips } from "../../redux/features/sipSlice";
import H2OGoalBar from "../../components/H2OGoalBar";

const HomeScreen = () => {
  const { sips, error, loading, profile } = useAppSelector((state) => ({
    sips: state.sips.data,
    error: state.sips.error,
    loading: state.sips.loading,
    profile: state.sips.profile,
  }));
  const dispatch = useAppDispatch();
  const addSip = () => {
    const newSip: SipResponseType = {
      createdAt: "2023-05-11T12:36:30.992Z",
      amount: 666,
      unit: "ml",
      id: "",
    };
    dispatch(add(newSip));
  };

  const onPressHandler = () => {
    console.log("state", sips, error, loading, profile);
  };

  useEffect(() => {
    dispatch(fetchSips());
  }, []);

  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day: any) => {
    const selectedDay = day.dateString;

    // Seçili günün işaretlenmesi
    setMarkedDates({
      ...markedDates,
      [selectedDay]: {
        selected: true,
        marked: true,
        dotColor: "red",
      },
    });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar style="dark" />
      <View style={styles.goalArea}>
        <H2OGoalBar amount={400} goal={500} unit={LiquidUnit.Milliliter} />
        <View style={styles.buttonArea}>
          <H2OButton
            onPress={() => console.log("mbb")}
            rightText="Remove"
            svg={ButtonEnum.Remove}
            style={styles.button}
          />
          <H2OButton
            onPress={() => console.log("mbb")}
            rightText="Add"
            svg={ButtonEnum.Add}
            style={styles.button}
          />
        </View>
      </View>
      <View style={styles.container}>
        <H2OCalendar
          style={styles.calendar}
          onDayPress={(e) => console.log(e)}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
