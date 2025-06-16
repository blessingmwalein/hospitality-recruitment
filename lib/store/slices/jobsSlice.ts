import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "../api"

interface JobsState {
  filters: {
    jobType: string[]
    employer: string[]
    location: string[]
    category: string[]
    search: string
  }
}

const initialState: JobsState = {
  filters: {
    jobType: [],
    employer: [],
    location: [],
    category: [],
    search: "",
  },
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ type: string; value: string[] }>) => {
      const { type, value } = action.payload
      state.filters[type as keyof typeof state.filters] = value
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { setFilter, setSearchQuery, clearFilters } = jobsSlice.actions

export default jobsSlice.reducer

// Jobs API endpoints
export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    applyForJob: builder.mutation({
      query: ({ jobId, applicationData }) => ({
        url: `/jobs/${jobId}/apply`,
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["Applications"],
    }),
    getJobCategories: builder.query({
      query: () => "/jobs/categories",
    }),
    getJobEmployers: builder.query({
      query: () => "/jobs/employers",
    }),
    getJobLocations: builder.query({
      query: () => "/jobs/locations",
    }),
    getJobTypes: builder.query({
      query: () => "/jobs/types",
    }),
  }),
})

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyForJobMutation,
  useGetJobCategoriesQuery,
  useGetJobEmployersQuery,
  useGetJobLocationsQuery,
  useGetJobTypesQuery,
} = jobsApi
