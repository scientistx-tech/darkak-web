// slices/authSlice.ts
import { AuthResponse, User, ModeratorAccess } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | undefined;
  cart: number;
  wish: number;
  accessList: string[];
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token"),
  accessList: [],
  cart: 0,
  wish: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = undefined;
      state.accessList = [];
      Cookies.remove("token");
      window.location.href="/"
    },
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      const accessList =
        action.payload.moderator_access?.map((item) => item.access) || [];

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.accessList = accessList;

      Cookies.set("token", action.payload.token, { expires: 30 });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setCart: (state, action: PayloadAction<number>) => {
      state.cart = action.payload;
    },
    setWish: (state, action: PayloadAction<number>) => {
      state.wish = action.payload;
    },
  },
});

export const { clearUser, setUser, updateUser, setCart, setWish } =
  authSlice.actions;
export default authSlice.reducer;
