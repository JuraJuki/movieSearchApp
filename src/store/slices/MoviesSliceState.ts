import { MovieType } from "src/store/types/MovieType";

export interface MoviesSliceState {
  movie: MovieType | null;
  movies: MovieType[];
  loading: boolean;
  error?: string;
  page: number;
  totalPages: number;
}
