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
    removeProgramme: (state, action) => {
      state.value = [];
    },
  },
});

export const { updateProgramme, removeProgramme } = programmeSlice.actions;
export default programmeSlice.reducer;
