// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: {
//     token: "",
//     role: "",
//     firstname: "",
//     name: "",
//     email: "",
//     password: "",
//     objectif: "",
//     dateNaissance: null,
//     sexe: "",
//     taille: 0,
//     poids: 0,
//   },
// };

// export const eleveSlice = createSlice({
//   name: "eleve",
//   initialState,
//   reducers: {
//     updateEleve: (state, action) => {
//       state.value = {
//         token: action.payload.token,
//         role: action.payload.role,
//         firstname: action.payload.firstname,
//         name: action.payload.name,
//         email: action.payload.email,
//         password: action.payload.password,
//       };
//     },
//     updateFirst: (state, action) => {
//       (state.value.role = action.payload.role),
//         (state.value.email = action.payload.email),
//         (state.value.password = action.payload.password);
//     },
//     updateSecond: (state, action) => {
//       (state.value.firstname = action.payload.firstname),
//         (state.value.name = action.payload.name);
//     },
//     updateThird: (state, action) => {
//       state.value.objectif = action.payload.objectif;
//     },
//     finalUpdate: (state, action) => {
//       (state.value.dateNaissance = action.payload.dateNaissance),
//         (state.value.sexe = action.payload.sexe),
//         (state.value.taille = action.payload.taille),
//         (state.value.poids = action.payload.poids);
//     },
//   },
// });

// export const {
//   updateEleve,
//   updateFirst,
//   updateSecond,
//   updateThird,
//   finalUpdate,
// } = eleveSlice.actions;
// export default eleveSlice.reducer;

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
  },
});

export const {
  updateEleve,
  updateFirst,
  updateSecond,
  updateThird,
  finalUpdate,
} = eleveSlice.actions;

export default eleveSlice.reducer;
