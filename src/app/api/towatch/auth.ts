// Local
import { storageUpdate } from "../../features/storageSlice";
import { apiSlice } from "./";

const apiUrl = import.meta.env.VITE_APP_API_URL;

type LoginPayload = {
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginPayload) => ({
        url: `${apiUrl}/login`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          console.log("onQueryStarted", result);

          dispatch(storageUpdate({ token: result.token, email: result.email }));
        } catch (error) {
          console.log(error);
        }
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useLoginMutation } = authApi;
