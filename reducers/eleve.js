import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    role: "",
    firstname: "",
    name: "",
    email: "",
    password: "",
    dateNaissance: null,
    sexe: "",
    taille: 0,
    poids: 0,
  },
};

export const eleveSlice = createSlice({
  name: "eleve",
  initialState,
  reducers: {
    updateEleve: (state, action) => {
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

export const { updateEleve } = eleveSlice.actions;
export default eleveSlice.reducer;
