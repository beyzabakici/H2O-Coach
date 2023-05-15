import { LiquidUnit } from "./enums";

export type IntakeResponseType = {
    id: string;
    amount: number;
    createdAt: string;
    unit: LiquidUnit;
}

export type IntakeRequestType = {
    amount: number;
    createdAt: string;
    unit: LiquidUnit;
}

export type ProfileResponseType = {
    dailyGoal: number;
    weeklyGoal: number;
    monthlyGoal: number;
    userId: string;
}

export type MarkedDate = {
    selected: boolean,
    marked: boolean,
    dotColor: string,
}