import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: (localStorage.getItem("theme") as "light" | "dark") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";

      localStorage.setItem("theme", state.mode);

      if (state.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;