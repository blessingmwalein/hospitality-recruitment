import { api } from "./api"

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "/admin/jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ id, jobData }) => ({
        url: `/admin/jobs/${id}`,
        method: "PUT",
        body: jobData,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    getAllApplications: builder.query({
      query: (params) => ({
        url: "/admin/applications",
        params,
      }),
      providesTags: ["Applications"],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/applications/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),
    exportApplicationsCSV: builder.query({
      query: (params) => ({
        url: "/admin/applications/export",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useLazyExportApplicationsCSVQuery,
} = adminApi
