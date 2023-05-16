import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  ProfileResponseType,
} from "../../utils";
import {
  addIntake,
  fetchIntakes,
  removeIntake,
  getGoals,
} from "../../redux/features/intakeSlice";
import H2OGoalBar from "../../components/H2OGoalBar";
import {
  AddModal,
  DetailsModal,
  RemoveModal,
  SettingsModal,
} from "../components";

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
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [selectedDayIntakes, setSelectedDayIntakes] = useState<
    IntakeResponseType[]
  >([]);
  const [goals, setGoals] = useState<ProfileResponseType>(profile);

  const dispatch = useAppDispatch();

  const addIntakeRequest = (intake: IntakeRequestType) => {
    dispatch(addIntake(intake));
  };

  const deleteIntake = (id: string) => {
    dispatch(removeIntake(id));
  };

  const handleMarkedDates = () => {
    setMarkedDates(
      convertToMarkedDates(
        intakes.map((day: IntakeResponseType) => day.createdAt)
      )
    );
  };

  useEffect(() => {
    dispatch(fetchIntakes());
    intakes && handleMarkedDates();
    dispatch(getGoals("1"));
    profile && setGoals(profile);
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
  const onPressAddButton = () => {
    setAddModalVisible(!addModalVisible);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar style="dark" />
      <View style={styles.goalArea}>
        <H2OGoalBar
          amount={todayIntakes}
          goal={goals.dailyGoal}
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
            onPress={onPressAddButton}
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
        profile={goals}
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
      <AddModal
        isVisible={addModalVisible}
        setVisible={setAddModalVisible}
        addIntake={addIntakeRequest}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
