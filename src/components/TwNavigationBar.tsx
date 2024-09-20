// Third party
import { NavLink } from "react-router-dom";
import { Clapperboard, Eye, MonitorCheck, StepBack } from 'lucide-react';
// Local
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from '@/components/ui/use-toast';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { storageUpdate } from '@/app/features/storageSlice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigation = [
  { name: 'Movie Collection', to: '/movies', icon: <Clapperboard className="h-6 w-6" /> },
  { name: 'Watched Shows', to: '/watched-shows', icon: <MonitorCheck className="h-6 w-6" /> },
  { name: 'Watching', to: '/watching', icon: <Eye className="h-6 w-6" /> }
];

const TwNavigationBar = () => {
  const dispatch = useAppDispatch();
  const { token, email } = useAppSelector((state) => state.storage);

  const userInitial = email?.split(' ').map((name: string) => name[0]).join('');

  const onLogout = async () => {
    await dispatch(storageUpdate({ prop: 'token', value: '' }));
    dispatch(storageUpdate({ prop: 'email', value: '' }));
    toast({
      description: 'You have been logged out.'
    });
  };

  const renderLinks = () => {
    return navigation.map((item) => {
      return (
        <Tooltip
          key={item.name}>
          <TooltipTrigger asChild>
            <NavLink
              to={item.to}
              className="relative text-center text-xl md:h-14 flex flex-row items-center justify-center mx-5 md:mx-0 md:my-2 group text-primary-foreground text-neutral-800 dark:text-neutral-100"
            >
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                  <span className={`absolute h-1 w-full sm:h-full sm:w-1 rounded-full top-0 sm:-right-[1px] bg-indigo-500 dark:bg-indigo-500 transition-transform duration-300 scale-y-0 group-hover:scale-y-100 ${isActive ? 'scale-y-100' : ''}`}></span>
                </>
              )}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    });
  }

  if (token) {
    return (
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-row md:flex-col justify-between fixed z-50 bottom-5 left-[5%] md:left-5 w-[90%] md:w-14 h-14 md:h-[90%] bg-white dark:bg-neutral-950 border-2 border-neutral-200 rounded-full dark:border-neutral-800 " v-if="token">
          <div className="flex flex-col items-center justify-center">
            <div className="text-indigo-500 font-bold text-xl w-full text-center ml-3 md:ml-0 md:py-4 md:mb-2">2W</div>

            <Avatar>
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </div>

          <nav className="flex flex-row md:flex-col">
            {renderLinks()}
          </nav>

          <div className="flex flex-row items-center justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" onClick={onLogout} className="relative w-14 md:h-14 flex flex-row items-center justify-center text-slate-500 hover:text-red-600 text-center text-xl">
                  <StepBack className="h-6 w-6 rotate-90" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return null;
};

export default TwNavigationBar;