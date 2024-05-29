// Third party
import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// Local
import { RootState } from "@/app/store";
import { storageUpdate } from "@/app/features/storageSlice";

const thirdPartyEndpoint = ["findShows", "findMovies"];

const setToken = (
  headers: Headers,
  endpoint: string,
  token: string | number | boolean | object | null
) => {
  if (token && thirdPartyEndpoint.indexOf(endpoint) < 0) {
    headers.set("Authorization", `Token ${token}`);
  }

  return headers;
};

const baseQuery = fetchBaseQuery({
  prepareHeaders(headers, { getState, endpoint }) {
    const { token } = (getState() as RootState).storage;

    return setToken(headers, endpoint, token);
  },
});

const baseQueryWithResponseHeaderWatcher: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    console.log("baseQueryWithResponseHeaderWatcher error", result);

    if (result.error.status === 401) {
      // Logout user
      api.dispatch(storageUpdate({ prop: "token", value: "" }));
      // api.dispatch(createError({ title: "Error", message: "Unauthorized" }));
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithResponseHeaderWatcher,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});
