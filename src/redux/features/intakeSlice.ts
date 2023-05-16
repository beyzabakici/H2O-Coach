import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ProfileResponseType,
  IntakeRequestType,
  IntakeResponseType,
  getCurrentTime,
  convertedTimestamp,
} from "../../utils";
import axios from "axios";
import { BASE_URL } from "react-native-dotenv";

const initialState: {
  data: IntakeResponseType[];
  profile: ProfileResponseType;
  error: string;
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
    const response = await axios.get<ProfileResponseType>(
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
    setProfile: (state, action: PayloadAction<ProfileResponseType>) => {
      state = {
        ...state,
        profile: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIntakes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchIntakes.fulfilled,
      (state, action: PayloadAction<IntakeResponseType[]>) => {
        const currentTimestamp = convertedTimestamp(getCurrentTime);
        const filteredIntakes = action.payload.filter(
          (intake) => convertedTimestamp(intake.createdAt) === currentTimestamp
        );
        const todayIntakes = filteredIntakes.reduce(
          (total, intake) => total + Number(intake.amount),
          0
        );
        return {
          ...state,
          data: action.payload,
          todayIntakes,
          loading: false,
        };
      }
    );
    builder.addCase(fetchIntakes.rejected, (state) => {
      state.loading = false;
      state.error = "An Unexpected Error";
    });
    builder.addCase(getGoals.pending, (state) => {
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
    builder.addCase(getGoals.rejected, (state) => {
      state.loading = false;
      state.error = "An Unexpected Error";
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
      state.error = action.error.message ?? "An Unexpected Error";
    });
    builder.addCase(removeIntake.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeIntake.fulfilled, (state, action) => {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        loading: false,
      };
    });
    builder.addCase(removeIntake.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An Unexpected Error";
    });
  },
});

export const { setProfile } = intakeSlice.actions;

export default intakeSlice.reducer;
