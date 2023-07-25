import { MovieType } from "src/store/types/MovieType";

export interface MoviesResponse {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
}
