import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { RootState } from "@/stores";
import { errorHandler } from "@/utils/helpers";

type initialStateType = {
  projects: ProjectType[];
  project: ProjectType | null;
  totalProjects: number;
  loading: boolean;
  error: any;
};

const initialState: initialStateType = {
  projects: [],
  project: null,
  totalProjects: 0,
  loading: false,
  error: "",
};

export const projectsSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    // action
    getProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProjectSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    getProjectsSuccess: (
      state,
      action: PayloadAction<PayloadFetchProjects>
    ) => {
      state.projects = action.payload.projects;
      state.totalProjects = action.payload.count;
      state.loading = false;
    },
    getProjectByIdSuccess: (state, action: PayloadAction<ProjectType>) => {
      state.project = action.payload;
      state.loading = false;
    },
    deleteProjectSucces: (state, action: PayloadAction<{ id: number }>) => {
      const newProjects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
      state.projects = newProjects;
      state.loading = false;
    },
    getProjectsFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProjectsStart,
  addProjectSuccess,
  getProjectsSuccess,
  deleteProjectSucces,
  getProjectByIdSuccess,
  getProjectsFailure,
} = projectsSlice.actions;

export const fetchProjects =
  (input: ParamsFetchProject): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const { limit, skip, sortBy, status, name, endDate, startDate } = input;

      const params: string[] = [];

      if (limit) params.push(`limit=${limit}`);
      if (skip) params.push(`skip=${skip}`);
      if (sortBy) params.push(`sortBy=${sortBy}`);
      if (status) params.push(`status=${status}`);
      if (name) params.push(`name=${name}`);
      if (endDate && startDate)
        params.push(`startDate=${startDate}&endDate=${endDate}`);

      const response = await axios.get(`/api/projects?${params.join("&")}`);

      const payload: PayloadFetchProjects = {
        projects: response.data.payload.data,
        count: response.data.payload.count,
      };

      dispatch(getProjectsSuccess(payload));
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const fetchProjectById =
  (id: number): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.get(`/api/projects/${id}`);

      const data = response.data.payload.data;

      dispatch(getProjectByIdSuccess(data));
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const createProject =
  (input: BodyParamsProject): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.post(`/api/projects`, input);

      dispatch(addProjectSuccess());
      return response.data.payload.data;
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const updateProjects =
  (
    id: number | string,
    input: BodyParamsProject
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.put(`/api/projects/${id}`, input);

      dispatch(addProjectSuccess());
      return response.data.payload.data;
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const updateProgressProject =
  (
    id: number | string,
    progress: number
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.patch(`/api/projects/${id}/progress`, {
        progress,
      });

      dispatch(addProjectSuccess());
      return response.data.payload.data;
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const updateStatusProject =
  (
    id: number | string,
    status: string
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.patch(`/api/projects/${id}/status`, {
        status,
      });

      dispatch(addProjectSuccess());
      return response.data.payload.data;
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export const deleteProject =
  (id: number): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(getProjectsStart());
    try {
      const response = await axios.delete(`/api/projects/${id}`);

      const data = response.data.payload.data;

      dispatch(deleteProjectSucces({ id: data.id }));
    } catch (error) {
      let errorMessage: string = errorHandler(error);

      dispatch(getProjectsFailure(errorMessage));
    }
  };

export default projectsSlice.reducer;
