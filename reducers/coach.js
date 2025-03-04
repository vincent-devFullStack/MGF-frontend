import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    role: "",
    firstname: "",
    name: "",
    email: "",
    password: "",
    villes: [],
    salles: [],
    siret: 0,
    domaine: "",
    description: "",
    diplomes: "",
  },
};

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    updateCoach: (state, action) => {
      state.value = {
        token: action.payload.token,
        role: action.payload.role,
        firstname: action.payload.firstname,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
});

export const { updateCoach } = coachSlice.actions;
export default coachSlice.reducer;
