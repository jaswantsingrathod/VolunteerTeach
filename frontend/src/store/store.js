import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slices/auth-slice.js";
import volunteerReducer from "@/slices/volunteer-slice.js";
import adminReducer from "@/slices/admin-slice.js";

const createStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            volunteer: volunteerReducer,
            admin: adminReducer,
        }
    })
}

export default createStore;