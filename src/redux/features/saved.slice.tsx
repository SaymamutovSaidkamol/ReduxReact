import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../types";

export interface SavedState {
  value: IRecipe[];
}

const initialState: SavedState = {
  value: [],
};

export const SavedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSaved: (state, action: PayloadAction<IRecipe>) => {
      const isExist = state.value.some((item) => item.id === action.payload.id);

      if (isExist) {
        state.value = state.value.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { toggleSaved } = SavedSlice.actions;

export default SavedSlice.reducer;
