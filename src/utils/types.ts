export type SipResponseType = {
    id: string;
    amount: number;
    createdAt: string;
    unit: string;
}

export type SipRequestType = {
    amount: number;
    createdAt: string;
    unit: string;
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