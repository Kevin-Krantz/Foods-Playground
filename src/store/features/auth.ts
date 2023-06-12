import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload as JwtPayloadBase } from "jwt-decode";

interface CustomJwtPayload extends JwtPayloadBase {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  currentUser: CustomJwtPayload | null;
}

const TOKEN_KEY = "token";

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  currentUser: getCurrentUser(),
};

function getCurrentUser(): CustomJwtPayload | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null) {
      return null;
    }
    const user = jwtDecode<CustomJwtPayload>(token);
    return user;
  } catch (error) {
    return null;
  }
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem(TOKEN_KEY, action.payload);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
      state.currentUser = getCurrentUser();
    },
    logout: (state) => {
      state.token = null;
      state.currentUser = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setToken, logout } = slice.actions;
export default slice.reducer;
