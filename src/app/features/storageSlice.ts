// Third party
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Local
import {
  getStorage,
  updateStorage,
  StorageType,
  storagePayload,
} from "@/services/storage";

const initialState: StorageType = {};

export const storageInitilize = createAsyncThunk(
  "storage/initilize",
  async () => {
    return await getStorage();
  }
);

export const storageUpdate = createAsyncThunk(
  "storage/update",
  async (payload: storagePayload) => {
    await updateStorage(payload);
    return payload;
  }
);

export const slice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storageInitilize.fulfilled, (_state, action) => action.payload)
      .addCase(storageUpdate.fulfilled, (state, action) => {
        state[action.payload.prop] = action.payload.value;
      });
  },
});

export default slice.reducer;
