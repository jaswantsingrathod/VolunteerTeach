import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const fetchVolunteerProfile = createAsyncThunk(
  "volunteer/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/volunteer/profile", {
        headers: { Authorization: token },
      });

      return res.data.volunteer;
    } catch (err) {
      return rejectWithValue("No profile found");
    }
  }
);

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    hasFetched: false,
    volunteers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVolunteerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.hasFetched = true;
      })
      .addCase(fetchVolunteerProfile.rejected, (state) => {
        state.loading = false;
        state.profile = null;
        state.hasFetched = true;
      })
      .addCase("user/logout", (state) => {
        state.profile = null;
        state.loading = false;
        state.error = null;
        state.hasFetched = false;
        state.volunteers = [];
      });
  },
});

export default volunteerSlice.reducer;