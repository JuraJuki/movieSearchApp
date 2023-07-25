import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MoviesResponse } from "src/store/slices/interfaces/MoviesResponse";
import { MoviesSliceState } from "src/store/slices/MoviesSliceState";
import { MovieType } from "src/store/types/MovieType";

const initialState: MoviesSliceState = {
  movie: null,
  movies: [],
  loading: false,
  page: 1,
  totalPages: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovieStart: (state) => {
      state.loading = true;
    },
    getMovieSuccess: (state, action: PayloadAction<MovieType>) => {
      state.movie = action.payload;
      state.loading = false;
    },
    getMovieFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMoviesStart: (state) => {
      state.loading = true;
    },
    getMoviesSuccess: (state, action: PayloadAction<MoviesResponse>) => {
      state.movies = action.payload.results;
      state.totalPages = action.payload.total_pages;
      state.page = action.payload.page;
      state.loading = false;
    },
    getMoviesFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      console.log(action);
      state.page = action.payload;
    },
  },
});

export const {
  getMovieStart,
  getMovieSuccess,
  getMovieFail,
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFail,
  setPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;

const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
const baseUrl = import.meta.env.VITE_MOVIES_API_URL;

// Thunk action for fetching a single movie
export const getMovie = createAsyncThunk(
  "movies/getMovie",
  async (movieId: number, { dispatch }) => {
    dispatch(getMovieStart());

    try {
      const response = await axios.get<MovieType>(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}`,
      );
      dispatch(getMovieSuccess(response.data));
    } catch (error: Error) {
      dispatch(getMovieFail(error.message));
    }
  },
);

// Thunk action for fetching movies with pagination and name search
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (name: string, { dispatch, getState }) => {
    dispatch(getMoviesStart());

    const { page }: MoviesSliceState = getState().movies;
    const params = { page, query: name };

    try {
      const response = await axios.get<MoviesResponse>(
        `${baseUrl}/search/movie?language=en-US&api_key=${apiKey}`,
        { params },
      );
      dispatch(getMoviesSuccess(response.data));
    } catch (err) {
      dispatch(getMoviesFail(err.message));
    }
  },
);
