import { useState } from 'react';
// Local
import TwCard from '../components/base/TwCard';
import TwFormLabel from '../components/base/TwFormLabel';
import TwFormField from '../components/base/TwFormField';
import TwButton from '../components/base/TwButton';
import { useLoginMutation } from '../app/api/towatch/auth';

const Login = () => {
   const [login] = useLoginMutation();
   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   const onChangeText = (prop: string, value: string) => {
      setForm({ ...form, [prop]: value });
   };

   return (
      <div className="relative mx-auto flex flex-col items-center w-full max-w-xl mt-12 sm:mt-16">
         <svg viewBox="0 0 1090 1090" aria-hidden="true" fill="none" preserveAspectRatio="none" width="1090" height="1090" className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto">
            <circle cx="545" cy="545" r="544.5"></circle>
            <circle cx="545" cy="545" r="480.5"></circle>
            <circle cx="545" cy="545" r="416.5"></circle>
            <circle cx="545" cy="545" r="352.5"></circle>
         </svg>

         <TwCard className="w-full p-14">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white">
               Sign in to your account
            </h2>

            <form name="signinForm" noValidate>
               <div className="mb-4">
                  <TwFormLabel for="email">Email</TwFormLabel>
                  <TwFormField id="email" onChange={(text) => onChangeText('email', text)} />
               </div>

               <div className="mb-4">
                  <div className="grid grid-cols-2">
                     <TwFormLabel for="password">Password</TwFormLabel>
                     <button className="text-right text-xs hover:text-indigo-600" type="button"
                        onClick={() => { }}>Forgotten your password?</button>
                  </div>
                  <TwFormField id="password" type="password" onChange={(text) => onChangeText('password', text)} />
               </div>

               <TwButton type="button" onClick={() => login(form)} className="w-full mt-7">Sign in</TwButton>
            </form>
         </TwCard>
      </div>
   );
};

export default Login;