import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project";
import dashboardReducer from "./slices/dashboard";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
