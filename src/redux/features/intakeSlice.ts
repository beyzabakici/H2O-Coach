import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ProfileResponseType,
  IntakeRequestType,
  IntakeResponseType,
  getCurrentTime,
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

export const fetchIntakes = createAsyncThunk("fetchIntakes", async () => {
  const response = await axios.get<IntakeResponseType[]>(`${BASE_URL}intake`);
  return response.data;
});

export const getGoals = createAsyncThunk("getGoals", async (id: string) => {
  const response = await axios.get<ProfileResponseType>(
    `${BASE_URL}/goal/${id}`
  );
  return response.data;
});

export const addIntakeRequest = async (intake: IntakeRequestType) =>
  await axios.post(`${BASE_URL}intake`, { ...intake });

export const removeIntakeRequest = async (id: string) =>
  await axios.delete(`${BASE_URL}intake${id}`);

export const intakeSlice = createSlice({
  name: "intake",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIntakes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchIntakes.fulfilled,
      (state, action: PayloadAction<IntakeResponseType[]>) => {
        state.data = action.payload;

        action!.payload!.map((intake) => {
          intake.createdAt.slice(0, 10) === getCurrentTime.slice(0, 10)
            ? (state.todayIntakes += Number(intake.amount))
            : null;
        });
        state.loading = false;
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
    builder.addCase(
      getGoals.fulfilled,
      (state, action: PayloadAction<ProfileResponseType>) => {
        state.profile = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getGoals.rejected, (state) => {
      state.loading = false;
      state.error = "An Unexpected Error";
    });
  },
  reducers: {
    addIntake: (state, action: PayloadAction<IntakeRequestType>) => {
      addIntakeRequest(action.payload)
        .then((resp) => state.data.push(resp.data))
        .catch((err) => {
          state = {
            ...state,
            error: err,
          };
        });
      state.todayIntakes += Number(action.payload.amount);
    },
    setProfile: (state, action: PayloadAction<ProfileResponseType>) => {
      state = {
        ...state,
        profile: action.payload,
      };
    },
    removeIntake: (state, action: PayloadAction<string>) => {
      removeIntakeRequest(action.payload)
        .then((resp) => {
          state = {
            ...state,
            data: state.data.filter((intake) => intake.id === resp.data.id),
          };
        })
        .catch((err) => {
          state = {
            ...state,
            error: err,
          };
        });
    },
  },
});

export const { addIntake, setProfile, removeIntake } = intakeSlice.actions;

export default intakeSlice.reducer;
