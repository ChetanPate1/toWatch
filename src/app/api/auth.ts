// Local
import { toast } from '@/components/ui/use-toast';
import { storageUpdate } from '@/app/features/storageSlice';
import { apiSlice } from './';

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
        method: 'POST',
        body: data
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data }: LoginResponse = await queryFulfilled;

          await dispatch(storageUpdate({ prop: 'token', value: data.token }));
          await dispatch(storageUpdate({ prop: 'email', value: data.email }));
          toast({
            title: 'Success!',
            description: "You've been successfully logged in."
          });
        } catch (error) {
          console.log(error);
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.'
          });
        }
      }
    })
  })
});

export const { useLoginMutation } = authApi;
