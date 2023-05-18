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
  GoalsResponseType,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data, profile, todayIntakes } = useAppSelector(
    (state) => state.intakes
  );
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedDayIntakes, setSelectedDayIntakes] = useState<
    IntakeResponseType[]
  >([]);
  const [goals, setGoals] = useState<GoalsResponseType>(profile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIntakes()).catch((error) => console.log("err", error));
    getStoreGoals();
    !goals?.dailyGoal && dispatch(getGoals("1"));
  }, [dispatch]);

  useEffect(() => {
    handleMarkedDates(data);
  }, [data]);

  useEffect(() => {
    setStoreGoals(profile);
  }, [profile]);

  const setStoreGoals = async (value: GoalsResponseType) => {
    try {
      const jsonValue = JSON.stringify(value);
      setGoals(value);
      await AsyncStorage.setItem("@h2o-coach", jsonValue);
    } catch (error) {
      console.log("Async Storage Error: ", error);
    }
  };

  const getStoreGoals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@h2o-coach");
      if (jsonValue !== null) {
        setGoals(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log("Async Storage Error: ", error);
    }
  };

  const addIntakeRequest = (intake: IntakeRequestType) => {
    dispatch(addIntake(intake));
  };

  const deleteIntake = (id: string) => {
    dispatch(removeIntake(id));
  };

  const handleMarkedDates = (currentIntakes: IntakeResponseType[]) => {
    const timestamps = currentIntakes.map((day) => day.createdAt);
    const convertedMarkedDates = convertToMarkedDates(timestamps);
    setMarkedDates(convertedMarkedDates);
  };

  const onDayPress = (selectedDay: any) => {
    const selectedDays = data.filter(
      (day: IntakeResponseType) =>
        day.createdAt.slice(0, 10) === selectedDay.dateString
    );
    setSelectedDayIntakes(selectedDays);
    setDetailsModalVisible(true);
  };

  const convertToMarkedDates = (
    timestamps: string[]
  ): Record<string, MarkedDate> => {
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
  };

  const closeSettingsModal = () => {
    navigation.setParams({ setttingsModalVisible: false });
  };

  const onPressRemoveButton = () => {
    const selectedDays: IntakeResponseType[] = data.filter(
      (day: IntakeResponseType) =>
        day.createdAt.slice(0, 10) === getCurrentTime.slice(0, 10)
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
          goal={goals?.dailyGoal}
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
        onSavePress={(editedGoals) => setStoreGoals(editedGoals)}
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
