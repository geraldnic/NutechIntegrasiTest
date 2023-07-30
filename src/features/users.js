import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [
  {
    username: "admin",
    password: "admin123",
    balance: 1000000,
  },
  {
    username: "user",
    password: "user123",
    balance: 50000,
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    decreaseBalance: (state, action) => {
      const updateIdx = state.value.findIndex(
        (obj) => obj.username === localStorage.getItem("username")
      );
      state.value[updateIdx].balance -= action.payload;
    },
  },
});

export const { decreaseBalance } = userSlice.actions;

export default userSlice.reducer;
