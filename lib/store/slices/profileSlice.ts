import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "../api"

interface ProfileState {
  currentStep: number
  formData: {
    personalInfo: any
    experience: any[]
    education: any[]
    certifications: any[]
    documents: any[]
  }
  completedSteps: boolean[]
}

const initialState: ProfileState = {
  currentStep: 0,
  formData: {
    personalInfo: {},
    experience: [],
    education: [],
    certifications: [],
    documents: [],
  },
  completedSteps: [false, false, false, false, false],
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    setStepCompleted: (state, action: PayloadAction<number>) => {
      state.completedSteps[action.payload] = true
    },
    updatePersonalInfo: (state, action: PayloadAction<any>) => {
      state.formData.personalInfo = action.payload
    },
    addExperience: (state, action: PayloadAction<any>) => {
      state.formData.experience.push(action.payload)
    },
    updateExperience: (state, action: PayloadAction<{ index: number; data: any }>) => {
      const { index, data } = action.payload
      state.formData.experience[index] = data
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.formData.experience.splice(action.payload, 1)
    },
    addEducation: (state, action: PayloadAction<any>) => {
      state.formData.education.push(action.payload)
    },
    updateEducation: (state, action: PayloadAction<{ index: number; data: any }>) => {
      const { index, data } = action.payload
      state.formData.education[index] = data
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.formData.education.splice(action.payload, 1)
    },
    addCertification: (state, action: PayloadAction<any>) => {
      state.formData.certifications.push(action.payload)
    },
    updateCertification: (state, action: PayloadAction<{ index: number; data: any }>) => {
      const { index, data } = action.payload
      state.formData.certifications[index] = data
    },
    removeCertification: (state, action: PayloadAction<number>) => {
      state.formData.certifications.splice(action.payload, 1)
    },
    addDocument: (state, action: PayloadAction<any>) => {
      state.formData.documents.push(action.payload)
    },
    removeDocument: (state, action: PayloadAction<number>) => {
      state.formData.documents.splice(action.payload, 1)
    },
    resetProfile: () => initialState,
  },
})

export const {
  setCurrentStep,
  setStepCompleted,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addCertification,
  updateCertification,
  removeCertification,
  addDocument,
  removeDocument,
  resetProfile,
} = profileSlice.actions

export default profileSlice.reducer

// Profile API endpoints
export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
    }),
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/profile/documents",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteDocument: builder.mutation({
      query: (documentId) => ({
        url: `/profile/documents/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    getUserApplications: builder.query({
      query: () => "/profile/applications",
      providesTags: ["Applications"],
    }),
    withdrawApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/profile/applications/${applicationId}/withdraw`,
        method: "PUT",
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useGetUserApplicationsQuery,
  useWithdrawApplicationMutation,
} = profileApi
