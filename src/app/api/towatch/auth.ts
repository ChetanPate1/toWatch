// Local
import { storageUpdate } from "../../features/storageSlice";
import { apiSlice } from "./";

const apiUrl = import.meta.env.VITE_APP_API_URL;

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: {
    token: string;
    email: string;
  };
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
          const { data }: LoginResponse = await queryFulfilled;

          dispatch(storageUpdate({ prop: "token", value: data.token }));
          dispatch(storageUpdate({ prop: "email", value: data.email }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
