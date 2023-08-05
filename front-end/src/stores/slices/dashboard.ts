import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "../axios";
import { errorHandler } from "@/utils/helpers";

type StatusType = "DONE" | "ONPROGRESS" | "PENDING";

type InitialStateType = {
  statistic: StatistikData | null;
  progress: ProgressFullYearType[];
  error: any;
  loading: boolean;
};

const initialState: InitialStateType = {
  statistic: null,
  progress: [],
  error: "",
  loading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    // action
    initDashboard: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatistic: (state, action: PayloadAction<any>) => {
      state.statistic = action.payload;
      state.loading = false;
    },
    getProgress: (state, action: PayloadAction<ProgressFullYearType[]>) => {
      state.progress = action.payload;
      state.loading = false;
    },
    catchErrorDashboard: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { initDashboard, getStatistic, getProgress, catchErrorDashboard } =
  dashboardSlice.actions;

export const fetchDashboard =
  (
    year: number,
    status: StatusType
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch(initDashboard());
      const params: any[] = [];

      if (status) {
        params.push(`status=${status}`);
      }
      params.push(`year=${year}`);

      const response = await axios.get(`/api/dashboard?${params.join("&")}`);
      const payload = response.data.payload as PayloadDashboard;
      dispatch(getStatistic(payload.statistic));
      dispatch(getProgress(payload.progress));
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(catchErrorDashboard(errorMessage));
    }
  };

export default dashboardSlice.reducer;
