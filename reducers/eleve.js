import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    role: "",
    firstname: "",
    name: "",
    email: "",
    password: "",
    objectif: "",
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
      state.value = { ...state.value, ...action.payload };
    },
    updateFirst: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    updateSecond: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    updateThird: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    finalUpdate: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const {
  updateEleve,
  updateFirst,
  updateSecond,
  updateThird,
  finalUpdate,
  logout,
} = eleveSlice.actions;

export default eleveSlice.reducer;
