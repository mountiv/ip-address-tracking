import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type GeoSliceState = {
  lat: Number;
  lon: Number;
  ip: String;
  isp: String;
  region: String;
  city: String;
  timezone: String;
  loading: Boolean;
  error: Boolean;
};

type FetchedData = {
  lat: Number;
  lon: Number;
  query: String;
  isp: String;
  regionName: String;
  city: String;
  timezone: String;
  status?: String;
};

const initialState: GeoSliceState = {
  lat: 0,
  lon: 0,
  ip: "",
  isp: "",
  region: "",
  city: "",
  timezone: "",
  loading: false,
  error: false,
};

export const getGeolocation = createAsyncThunk<FetchedData, String>(
  "geo/get",
  async (address) => {
    try {
      const res = await fetch(
        `http://ip-api.com/json/${address}?fields=status,message,regionName,city,lat,lon,timezone,isp,query`
      );
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInitialGeolocation = createAsyncThunk(
  "geo/getInitial",
  async () => {
    try {
      const res = await fetch("http://ip-api.com/json");
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getGeolocation.fulfilled, (state, action) => {
        if (action.payload.status === "fail") {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.lat = action.payload?.lat;
          state.lon = action.payload?.lon;
          state.region = action.payload?.regionName;
          state.city = action.payload?.city;
          state.timezone = action.payload?.timezone;
          state.ip = action.payload?.query;
          state.isp = action.payload?.isp;
        }
      })
      .addCase(getInitialGeolocation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getInitialGeolocation.fulfilled, (state, action) => {
        if (action.payload.status === "fail") {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.lat = action.payload?.lat;
          state.lon = action.payload?.lon;
          state.region = action.payload?.regionName;
          state.city = action.payload?.city;
          state.timezone = action.payload?.timezone;
          state.ip = action.payload?.query;
          state.isp = action.payload?.isp;
        }
      });
  },
});

export default geoSlice.reducer;
