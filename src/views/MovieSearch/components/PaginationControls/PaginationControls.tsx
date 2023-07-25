import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "src/components/IconButton/IconButton";
import { ArrowLeft } from "src/components/icons/ArrowLeft";
import { ArrowRight } from "src/components/icons/ArrowRight";
import { InputEnter } from "src/components/InputEnter/InputEnter";
import { setPage } from "src/store/slices/moviesSlice";
import { RootState } from "src/store/store";
import { MovieType } from "src/store/types/MovieType";
import styled from "styled-components";

export const PaginationControls: FC = () => {
  const dispatch = useDispatch();
  const { totalPages, page } = useSelector<RootState, MovieType[]>(
    (state) => state.movies,
  );

  if (!page || totalPages <= 1) return null;

  return (
    <PaginationWrap data-testid={"pagination"}>
      <IconButton
        name={<ArrowLeft />}
        onClick={() => dispatch(setPage(page - 1))}
        disabled={page === 1}
      />
      <PageNumberWrap>
        <InputEnter
          onEnter={(pageValue: number) => dispatch(setPage(pageValue))}
          value={page}
          inputType={"number"}
        />
        <TotalPageNumber>/{totalPages}</TotalPageNumber>
      </PageNumberWrap>
      <IconButton
        name={<ArrowRight />}
        onClick={() => dispatch(setPage(page + 1))}
        disabled={page === totalPages}
      />
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
`;

const PageNumberWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const TotalPageNumber = styled.div`
  font-size: 20px;
`;
