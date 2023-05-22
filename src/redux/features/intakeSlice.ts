import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoalsResponseType,
  IntakeRequestType,
  IntakeResponseType,
  getCurrentTime,
  getDayMonthYear,
} from "../../utils";
import axios from "axios";
import Constants from "expo-constants";
import { AppConfig } from "../../../app.config";
const { BASE_URL } = (Constants.manifest?.extra as AppConfig) || {};

const initialState: {
  data: IntakeResponseType[];
  profile: GoalsResponseType;
  error: string | undefined;
  loading: boolean;
  todayIntakes: number;
} = {
  data: [],
  profile: {
    dailyGoal: 0,
    weeklyGoal: 0,
    monthlyGoal: 0,
    userId: "",
  },
  error: "",
  loading: false,
  todayIntakes: 0,
};

export const fetchIntakes = createAsyncThunk(
  "intake/fetchIntakes",
  async () => {
    const response = await axios.get<IntakeResponseType[]>(`${BASE_URL}intake`);
    return response.data;
  }
);

export const getGoals = createAsyncThunk(
  "intake/getGoals",
  async (id: string) => {
    const response = await axios.get<GoalsResponseType>(
      `${BASE_URL}/goal/${id}`
    );
    return response.data;
  }
);

export const addIntake = createAsyncThunk(
  "intake/addIntake",
  async (intake: IntakeRequestType) => {
    const response = await axios.post<IntakeResponseType>(`${BASE_URL}intake`, {
      ...intake,
    });
    return response.data;
  }
);

export const removeIntake = createAsyncThunk(
  "intake/removeIntake",
  async (id: string) => {
    await axios.delete(`${BASE_URL}intake/${id}`);
    return id;
  }
);

const intakeSlice = createSlice({
  name: "intake",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<GoalsResponseType>) => {
      state = {
        ...state,
        profile: action.payload,
      };
    },
    setError: (state, action) => {
      state = {
        ...state,
        error: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIntakes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchIntakes.fulfilled, (state, action) => {
      const currentTimestamp = getDayMonthYear(getCurrentTime);
      const { payload } = action;

      const filteredIntakes =
        payload &&
        payload.filter(
          (intake) => getDayMonthYear(intake.createdAt) === currentTimestamp
        );

      const todayIntakes =
        filteredIntakes &&
        filteredIntakes.reduce(
          (total, intake) => total + Number(intake.amount),
          0
        );

      return {
        ...state,
        data: payload,
        todayIntakes,
        loading: false,
      };
    });

    builder.addCase(fetchIntakes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getGoals.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addIntake.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addIntake.fulfilled, (state, action) => {
      const newIntake = action.payload;
      const updatedData = [...state.data, newIntake];
      const updatedTodayIntakes = state.todayIntakes + Number(newIntake.amount);
      return {
        ...state,
        data: updatedData,
        todayIntakes: updatedTodayIntakes,
        loading: false,
      };
    });
    builder.addCase(addIntake.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(removeIntake.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeIntake.fulfilled, (state, action) => {
      const newData = state.data.filter((item) => item.id !== action.payload);
      const amount =
        state!.data!.find((item) => item.id === action.payload)?.amount ?? 0;
      const updatedTodayIntakes = state.todayIntakes - Number(amount);
      return {
        ...state,
        data: newData,
        todayIntakes: updatedTodayIntakes,
        loading: false,
      };
    });
    builder.addCase(removeIntake.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setProfile, setError } = intakeSlice.actions;

export default intakeSlice.reducer;
