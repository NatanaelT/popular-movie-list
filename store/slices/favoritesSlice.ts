import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface IFavorites {
  id: number;
  title: string;
}

export interface CounterState {
  favorites: IFavorites[];
}

const initialState: CounterState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, { payload }) {
      return { favorites: [...state.favorites, payload] };
    },
    removeFavorite(state, { payload }) {
      return { favorites: state.favorites.filter((obj) => obj.id !== payload) };
    },
  },
});

export const selectFavorites = (state: RootState): IFavorites[] => {
  try {
    return state.favorites.favorites;
  } catch (error) {
    return [];
  }
};

export const { setFavorites, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
