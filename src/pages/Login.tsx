// Core
import { useEffect } from 'react';
// Third Party
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Local
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useLoginMutation } from '@/app/api/auth';
import { useAppSelector } from '@/app/store';
import { useNavigate } from 'react-router-dom';

const FormSchema = z.object({
   email: z.string().email({
      message: "Email is invalid.",
   }),
   password: z.string()
});

const Login = () => {
   const navigate = useNavigate();
   const { token } = useAppSelector((state) => state.storage);
   const [login] = useLoginMutation();

   useEffect(() => {
      if (token) {
         navigate(-1);
      }
   }, []);

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         email: '',
         password: ''
      },
   });

   const onSubmit = (data: z.infer<typeof FormSchema>) => {
      login(data).unwrap()
         .then(() => navigate('/watching'));
   };

   return (
      <div className="relative mx-auto flex flex-col items-center w-full max-w-md mt-12 sm:mt-16">
         <svg viewBox="0 0 1090 1090" aria-hidden="true" fill="none" preserveAspectRatio="none" width="1090" height="1090" className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto">
            <circle cx="545" cy="545" r="544.5"></circle>
            <circle cx="545" cy="545" r="480.5"></circle>
            <circle cx="545" cy="545" r="416.5"></circle>
            <circle cx="545" cy="545" r="352.5"></circle>
         </svg>

         <Card className="w-full">
            <CardHeader>
               <CardTitle>Sign in to your account</CardTitle>
               <CardDescription>Keep track of your favourite shows</CardDescription>
            </CardHeader>

            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="Enter your email..." {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <div className="grid grid-cols-2">
                                 <FormLabel>Password</FormLabel>
                                 <button className="text-right text-xs hover:text-indigo-600" type="button"
                                    onClick={() => { }}>Forgotten your password?</button>
                              </div>

                              <FormControl>
                                 <Input placeholder="Enter your password..." {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type="submit" className="w-full mt-7">Submit</Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
};

export default Login;