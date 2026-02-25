import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const fetchAllVolunteers = createAsyncThunk(
  "admin/fetchAllVolunteers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/volunteer/all", {
        headers: { Authorization: token },
      });

      return res.data.volunteers;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch volunteers");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    volunteers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVolunteers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVolunteers.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = action.payload;
      })
      .addCase(fetchAllVolunteers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("user/logout", (state) => {
        state.volunteers = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default adminSlice.reducer;