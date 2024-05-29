// Third party
import { EyeIcon, FilmIcon, TvIcon } from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";
// Local
import { useAppSelector } from '@/app/store';

const navigation = [
  { name: 'Movie Collection', to: '/movies', icon: <FilmIcon className="h-6 w-6 text-white" /> },
  { name: 'Watched Shows', to: '/watched-shows', icon: <TvIcon className="h-6 w-6 text-white" /> },
  { name: 'Watching', to: '/watching', icon: <EyeIcon className="h-6 w-6 text-white" /> }
];

const TwNavigationBar = () => {
  const { token, user } = useAppSelector((state) => state.storage);

  const userInitial = user?.email?.split(' ').map((name) => name[0]).join('');

  const renderLinks = () => {
    return navigation.map((item) => {
      return (
        <NavLink
          key={item.name}
          to={item.to}
          className="relative text-white text-center text-xl md:h-14 flex flex-row items-center justify-center mx-5 md:mx-0 md:my-2 group hover:text-indigo-500"
        >
          {({ isActive }) => (
            <>
              {item.icon}
              <span className="sr-only">{item.name}</span>
              <span className={`absolute h-1 w-full sm:h-full sm:w-1 rounded-full top-0 sm:-right-[1px] bg-indigo-500 transition-transform duration-300 scale-y-0 group-hover:scale-y-100 ${isActive ? 'scale-y-100' : ''}`}></span>
            </>
          )}
        </NavLink>
      );
    });
  }

  if (token) {
    return (
      <div className="flex flex-row md:flex-col justify-between fixed z-50 bottom-5 left-[5%] md:left-5 w-[90%] md:w-14 h-14 md:h-[90%] border-2 border-zinc-800 rounded-full bg-zinc-900" v-if="token">
        <div className="flex flex-col item-center justify-center">
          <div className="text-indigo-500 font-bold text-xl w-full text-center ml-3 md:ml-0 md:py-4 md:mb-2">2W</div>

          <div className="h-10 w-10 text-sm items-center justify-center place-self-center text-white uppercase overflow-hidden border-2 border-zinc-800 rounded-full bg-zinc-900 hidden md:inline-flex">
            {userInitial}
          </div>
        </div>

        <nav className="flex flex-row md:flex-col">
          {renderLinks()}
        </nav>

        <div className="flex flex-row items-center justify-center">
          <button type="button" className="relative w-14 md:h-14 flex flex-row items-center justify-center text-slate-500 hover:text-red-600 text-center text-xl">
            <svg className="w-4 h-4" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.08338 13.8334L0.244704 13.1811C-0.00444549 13.5015 -0.0493679 13.9357 0.12892 14.3002C0.307221 14.6647 0.67758 14.8959 1.08338 14.8959V13.8334ZM20.9167 13.8334V14.8959C21.3226 14.8959 21.6929 14.6647 21.8711 14.3002C22.0495 13.9357 22.0046 13.5015 21.7554 13.1811L20.9167 13.8334ZM1.08338 14.8959H20.9167V12.7709H1.08338V14.8959ZM9.04307 1.86889L0.244704 13.1811L1.92207 14.4858L10.7205 3.17351L9.04307 1.86889ZM21.7554 13.1811L12.957 1.86887L11.2796 3.17351L20.0781 14.4858L21.7554 13.1811ZM10.7205 3.17351C10.8624 2.9912 11.1378 2.9912 11.2796 3.17351L12.957 1.86887C11.9644 0.592739 10.0357 0.592739 9.04307 1.86889L10.7205 3.17351Z" fill="#515151" />
              <path d="M1.08337 18.4375C0.496577 18.4375 0.020874 18.9132 0.020874 19.5C0.020874 20.0868 0.496577 20.5625 1.08337 20.5625V18.4375ZM20.9167 20.5625C21.5035 20.5625 21.9792 20.0868 21.9792 19.5C21.9792 18.9132 21.5035 18.4375 20.9167 18.4375V20.5625ZM1.08337 20.5625H20.9167V18.4375H1.08337V20.5625Z" fill="#515151" />
            </svg>

            <span className="sr-only">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TwNavigationBar;