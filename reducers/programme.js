import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const programmeSlice = createSlice({
  name: "programme",
  initialState,
  reducers: {
    updateProgramme: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { updateProgramme } = programmeSlice.actions;
export default programmeSlice.reducer;
