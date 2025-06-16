import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "./slices/authSlice"
import jobsReducer from "./slices/jobsSlice"
import profileReducer from "./slices/profileSlice"
import { api } from "./api"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    profile: profileReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
