import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { intakeSlice } from "./features";

const store = configureStore({
  reducer: {
    intakes: intakeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDisparch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDisparch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;