import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import styles from "./styles";
import { H2OButton, H2OCalendar } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  SvgEnum,
  Colors,
  LiquidUnit,
  MarkedDate,
  SipRequestType,
  SipResponseType,
  getCurrentTime,
} from "../../utils";
import { add, fetchSips } from "../../redux/features/sipSlice";
import H2OGoalBar from "../../components/H2OGoalBar";
import { getGoals } from "../../redux/features/sipSlice";
import { DetailsModal, SettingsModal } from "../components";

type Props = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sips, error, loading, profile, todaySips } = useAppSelector(
    (state) => ({
      sips: state.sips.data,
      error: state.sips.error,
      loading: state.sips.loading,
      profile: state.sips.profile,
      todaySips: state.sips.todaySips,
    })
  );
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>(
    {}
  );
  const [detailsModalVisible, setDetailsModalVisible] =
    useState<boolean>(false);
  const [selectedDayIntakes, setSelectedDayIntakes] = useState<
    SipResponseType[]
  >([]);

  const dispatch = useAppDispatch();
  const addSip = () => {
    const amount = 3200;
    const newSip: SipRequestType = {
      createdAt: getCurrentTime,
      amount: amount,
      unit: LiquidUnit.Milliliter,
    };
    dispatch(add(newSip));
  };

  const deleteIntake = (id: string) => {
    dispatch(removeIntake(id))
  };

  useEffect(() => {}, [route, navigation]);
  useEffect(() => {
    dispatch(fetchSips()).then((resp: any) => {
      setMarkedDates(
        convertToMarkedDates(
          resp.payload.map((day: SipResponseType) => day.createdAt)
        )
      );
    });
    dispatch(getGoals("1"));
  }, []);

  const onDayPress = (selectedDay: any) => {
    const selectedDays: SipResponseType[] = sips.filter(
      (day) => day.createdAt.slice(0, 10) === selectedDay.dateString && day
    );
    setSelectedDayIntakes(selectedDays);
    setDetailsModalVisible(true);
  };

  function convertToMarkedDates(
    timestamps: string[]
  ): Record<string, MarkedDate> {
    const datesObj: Record<string, MarkedDate> = {};

    timestamps.forEach((timestamp) => {
      const date = timestamp.slice(0, 10);

      if (!datesObj[date]) {
        datesObj[date] = {
          dotColor: Colors.primaryOrange,
          marked: true,
          selected: true,
        };
      }
    });

    return datesObj;
  }

  const closeSettingsModal = () => {
    navigation.setParams({ setttingsModalVisible: false });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar style="dark" />
      <View style={styles.goalArea}>
        <H2OGoalBar
          amount={todaySips}
          goal={profile.dailyGoal}
          unit={LiquidUnit.Milliliter}
        />
        <View style={styles.buttonArea}>
          <H2OButton
            onPress={deleteIntake}
            rightText="Remove"
            svg={SvgEnum.Remove}
            style={styles.button}
            iconStyle={styles.buttonIcon}
          />
          <H2OButton
            onPress={addSip}
            rightText="Add"
            svg={SvgEnum.Add}
            style={styles.button}
            iconStyle={styles.buttonIcon}
          />
        </View>
      </View>
      <View style={styles.container}>
        <H2OCalendar
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={markedDates}
        />
      </View>
      <SettingsModal
        isVisible={route?.params?.setttingsModalVisible}
        setVisible={closeSettingsModal}
        profile={profile}
      />
      <DetailsModal
        isVisible={detailsModalVisible}
        setVisible={setDetailsModalVisible}
        dayIntakes={selectedDayIntakes}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
