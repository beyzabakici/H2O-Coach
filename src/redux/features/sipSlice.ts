import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileResponseType, SipRequestType, SipResponseType } from "../../utils";
import axios from "axios";
import { BASE_URL } from 'react-native-dotenv'



const initialState: {
  data: SipResponseType[],
  profile: ProfileResponseType,
  error: string,
  loading: boolean,
} = {
  data: [], 
  profile: {
    dailyGoal: 0,
    weeklyGoal: 0,
    monthlyGoal: 0,
    userId: ""
  },
  error: "",
  loading: false,
};

export const fetchSips = createAsyncThunk('fetchSips', async () => {
  const response = await axios.get<SipResponseType[]>(`${BASE_URL}intake`);
  return response.data;
})

export const getGoals = createAsyncThunk('getGoals', async (id: string) => {
  const response = await axios.get<ProfileResponseType>(`${BASE_URL}/goal/${id}`);
  return response.data;
})

export const addSip = async (sip: SipRequestType) => await axios.post(`${BASE_URL}intake`, {sip})

export const sipSlice = createSlice({
  name: "sip",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSips.pending, (state) => {
      state.loading= true;
      state.error= "";
    })
    builder.addCase(fetchSips.fulfilled, (state, action: PayloadAction<SipResponseType[]>) => {
      state.data= action.payload;
      state.loading= false;
    })
    builder.addCase(fetchSips.rejected, (state, ) => {
      state.loading= false;
      state.error= "An Unexpected Error"
    })
    builder.addCase(getGoals.pending,(state) => {
      state.loading= true;
      state.error=""
    })
    builder.addCase(getGoals.fulfilled, (state, action: PayloadAction<ProfileResponseType>) => {
      state.profile= action.payload;
      state.loading= false;
    })
    builder.addCase(getGoals.rejected,(state) => {
      state.loading= false;
      state.error= "An Unexpected Error"
    })
  },
   reducers: {
    add: (state, action: PayloadAction<SipResponseType>) => {
        addSip(action.payload)
        state.data.push(action.payload)
    },
    setProfile: (state, action: PayloadAction<ProfileResponseType>) => {
      state = {
        ...state,
        profile: action.payload 
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      state = {
        ...state,
        data: state.data.filter(sip => sip.id !== action.payload)
      }
    }
  },
});

export const { add, setProfile, remove } = sipSlice.actions;

export default sipSlice.reducer;