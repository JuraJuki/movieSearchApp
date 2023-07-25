import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HorizontalCentered } from "src/components/HorizontalCentered/HorizontalCentered";
import { InputSearch } from "src/components/InputSearch/InputSearch";
import { getMovies } from "src/store/slices/moviesSlice";
import { RootState } from "src/store/store";
import { MovieType } from "src/store/types/MovieType";
import { MovieList } from "src/views/MovieSearch/components/MovieList/MovieList";
import { PaginationControls } from "src/views/MovieSearch/components/PaginationControls/PaginationControls";

export const MovieSearch: FC = () => {
  const [inputValue, setInputValue] = useState("");

  // can be extracted to a custom hook "useGetMovies"
  const dispatch = useDispatch();
  const { movies, loading, page } = useSelector<RootState, MovieType[]>(
    (state) => state.movies,
  );

  useEffect(() => {
    if (!inputValue) return;

    dispatch(getMovies(inputValue));
  }, [dispatch, inputValue, page]);
  //____

  const setSearchValue = (value: string) => setInputValue(value);
  const handleEnterSearch = (value) => {
    setSearchValue(value);
    if (value === "") dispatch(getMovies(""));
  };

  return (
    <HorizontalCentered>
      <h2>Movie Searcher</h2>
      <InputSearch
        debounceTime={500}
        onDebounce={setSearchValue}
        onEnter={handleEnterSearch}
        placeholder={"Search movies.."}
        loading={loading}
      />
      <MovieList movies={movies.length ? movies : null} />
      {movies.length ? <PaginationControls /> : null}
    </HorizontalCentered>
  );
};
