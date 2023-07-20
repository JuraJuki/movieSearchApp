import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { ThunkDispatch } from "redux-thunk";

export type BaseQueryFn<
  Args = unknown,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = object,
  Meta = object,
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions,
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;

export interface BaseQueryApi {
  signal: AbortSignal;
  dispatch: ThunkDispatch<unknown, unknown, unknown>;
  getState: () => unknown;
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };
