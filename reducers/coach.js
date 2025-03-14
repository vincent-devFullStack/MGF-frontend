import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    role: "",
    firstname: "",
    name: "",
    email: "",
    password: "",
    secretWord: "",
    photo: "",
    villes: null,
    salles: null,
    siret: 0,
    domaines: null,
    description: "",
    diplomes: null,
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
        photoProfil: action.payload.photoProfil,
      };
    },
    updateFirst: (state, action) => {
      (state.value.role = action.payload.role),
        (state.value.email = action.payload.email),
        (state.value.password = action.payload.password),
        (state.value.secretWord = action.payload.secretWord);
    },
    updateSecond: (state, action) => {
      (state.value.firstname = action.payload.firstname),
        (state.value.name = action.payload.name);
    },
    updateThird: (state, action) => {
      (state.value.photo = action.payload.photo),
        (state.value.villes = action.payload.villes),
        (state.value.salles = action.payload.salles),
        (state.value.siret = action.payload.siret);
    },
    updateFourth: (state, action) => {
      (state.value.domaines = action.payload.domaines),
        (state.value.description = action.payload.description),
        (state.value.diplomes = action.payload.diplomes);
    },
  },
});

export const {
  updateCoach,
  updateFirst,
  updateSecond,
  updateThird,
  updateFourth,
} = coachSlice.actions;
export default coachSlice.reducer;
