import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import styles from "./styles";
import { H2OButton } from "../../components";
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
  screenWidth,
} from "../../utils";
import {
  addIntake,
  fetchIntakes,
  removeIntake,
  getGoals,
  setError,
} from "../../redux/features/intakeSlice";
import H2OGoalBar from "../../components/H2OGoalBar";
import {
  AddModal,
  DetailsModal,
  RemoveModal,
  SettingsModal,
} from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Footer } from "./components";

type Props = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data, profile, todayIntakes, error, loading } = useAppSelector(
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
    dispatch(fetchIntakes());
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
      setError(`Async Storage Error: ${error}`);
    }
  };

  const getStoreGoals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@h2o-coach");
      if (jsonValue !== null) {
        setGoals(JSON.parse(jsonValue));
      }
    } catch (error) {
      setError(`Async Storage Error: ${error}`);
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

  const errorAlert = () => {
    Alert.alert(error ? error : "Error", "Please try again later.", [
      { text: "OK", onPress: () => dispatch(fetchIntakes()) },
    ]);
  };

  if (error) {
    errorAlert();
    return <></>;
  } else {
    return !!loading ? (
      <ActivityIndicator
        size="large"
        style={styles.loading}
        color={Colors.primaryBlue}
      />
    ) : (
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
        <Footer
          setDetailsModalVisible={setDetailsModalVisible}
          setSelectedDayIntakes={setSelectedDayIntakes}
          markedDates={markedDates}
        />
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
  }
};

export default HomeScreen;
