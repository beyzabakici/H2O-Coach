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
  IntakeRequestType,
  IntakeResponseType,
  getCurrentTime,
} from "../../utils";
import {
  addIntake,
  fetchIntakes,
  removeIntake,
} from "../../redux/features/intakeSlice";
import H2OGoalBar from "../../components/H2OGoalBar";
import { getGoals } from "../../redux/features/intakeSlice";
import { DetailsModal, RemoveModal, SettingsModal } from "../components";

type Props = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { intakes, error, loading, profile, todayIntakes } = useAppSelector(
    (state) => ({
      intakes: state.intakes.data,
      error: state.intakes.error,
      loading: state.intakes.loading,
      profile: state.intakes.profile,
      todayIntakes: state.intakes.todayIntakes,
    })
  );
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>(
    {}
  );
  const [detailsModalVisible, setDetailsModalVisible] =
    useState<boolean>(false);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [selectedDayIntakes, setSelectedDayIntakes] = useState<
    IntakeResponseType[]
  >([]);

  const dispatch = useAppDispatch();
  const addIntakeRequest = () => {
    const amount = 3200;
    const newIntake: IntakeRequestType = {
      createdAt: getCurrentTime,
      amount: amount,
      unit: LiquidUnit.Milliliter,
    };
    dispatch(addIntake(newIntake));
  };

  const deleteIntake = (id: string) => {
    dispatch(removeIntake(id));
  };

  useEffect(() => {
    dispatch(fetchIntakes()).then((resp: any) => {
      setMarkedDates(
        convertToMarkedDates(
          resp.payload.map((day: IntakeResponseType) => day.createdAt)
        )
      );
    });
    dispatch(getGoals("1"));
  }, []);

  const onDayPress = (selectedDay: any) => {
    const selectedDays: IntakeResponseType[] = intakes.filter(
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

  const onPressRemoveButton = () => {
    const selectedDays: IntakeResponseType[] = intakes.filter(
      (day) => day.createdAt.slice(0, 10) === getCurrentTime.slice(0, 10) && day
    );
    setSelectedDayIntakes(selectedDays);
    setRemoveModalVisible(!removeModalVisible);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar style="dark" />
      <View style={styles.goalArea}>
        <H2OGoalBar
          amount={todayIntakes}
          goal={profile.dailyGoal}
          unit={LiquidUnit.Milliliter}
        />
        <View style={styles.buttonArea}>
          <H2OButton
            onPress={onPressRemoveButton}
            rightText="Remove"
            svg={SvgEnum.Remove}
            style={styles.button}
            iconStyle={styles.buttonIcon}
          />
          <H2OButton
            onPress={addIntakeRequest}
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
      <RemoveModal
        isVisible={removeModalVisible}
        setVisible={setRemoveModalVisible}
        dayIntakes={selectedDayIntakes}
        deleteIntake={deleteIntake}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
