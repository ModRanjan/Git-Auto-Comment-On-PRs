import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Page } from './types';
import { UserType } from '@/types/User';
import { PRDataType } from '@/types/PRsData';

export interface UserState {
  user: UserType | null;
  totalRepos: number;
  PRStatData: PRDataType;
  currentPage: Page;
}

export const initialState: UserState = {
  user: null,
  totalRepos: 0,
  PRStatData: {
    totalPRs: 0,
    totalOpenPRs: 0,
  },
  currentPage: Page.LandingPage,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setTotalRepos: (state, action: PayloadAction<number>) => {
      state.totalRepos = action.payload;
    },
    setPRStat: (state, action: PayloadAction<PRDataType>) => {
      state.PRStatData = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setTotalRepos, setCurrentPage, setPRStat } =
  userSlice.actions;

export default userSlice.reducer;
