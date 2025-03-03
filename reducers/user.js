import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: "",
    eleve: {
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
    coach: {
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
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateType: (state, action) => {
      state.value.type = action.payload;
    },
    updateRoleEleve: (state, action) => {
      state.value.eleve.role = action.payload;
    },
    updateRoleCoach: (state, action) => {
      state.value.eleve.role = action.payload;
    },
  },
});

export const { updateType, updateRoleEleve, updateRoleCoach } =
  userSlice.actions;
export default userSlice.reducer;
