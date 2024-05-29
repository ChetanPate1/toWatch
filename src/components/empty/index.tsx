// Thirty party
import { PlusIcon } from "@heroicons/react/24/outline";
// Local
import TwButton from "@/components/base/TwButton";

type Props = {
   buttonName: string;
   message: string;
   onClick?: () => void;
};


const Empty = (props: Props) => {
   return (
      <div className="flex items-center justify-center h-[700px]">
         <div className="flex flex-col items-center">
            <svg className="mb-4" width="99" height="94" viewBox="0 0 99 94" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M2 14C2 7.37258 7.37258 2 14 2H85C91.6274 2 97 7.37258 97 14V29C97 35.6274 91.6274 41 85 41H14C7.37258 41 2 35.6274 2 29V14Z" fill="#16171C" />
               <path d="M27 22C27 24.2091 28.7909 26 31 26H81C83.2091 26 85 24.2091 85 22C85 19.7909 83.2091 18 81 18H31C28.7909 18 27 19.7909 27 22Z" fill="#6466F1" />
               <path d="M12 22C12 19.7909 13.7909 18 16 18C18.2091 18 20 19.7909 20 22C20 24.2091 18.2091 26 16 26C13.7909 26 12 24.2091 12 22Z" fill="#6466F1" />
               <path fillRule="evenodd" clipRule="evenodd" d="M2 65C2 58.3726 7.37258 53 14 53H85C91.6274 53 97 58.3726 97 65V80C97 86.6274 91.6274 92 85 92H14C7.37258 92 2 86.6274 2 80V65Z" fill="#16171C" />
               <path d="M27 73C27 70.7909 28.7909 69 31 69H81C83.2091 69 85 70.7909 85 73C85 75.2091 83.2091 77 81 77H31C28.7909 77 27 75.2091 27 73Z" fill="#6466F1" />
               <path d="M12 73C12 70.7909 13.7909 69 16 69C18.2091 69 20 70.7909 20 73C20 75.2091 18.2091 77 16 77C13.7909 77 12 75.2091 12 73Z" fill="#6466F1" />
               <path fillRule="evenodd" clipRule="evenodd" d="M14 0H85C92.732 0 99 6.26801 99 14V29C99 36.732 92.732 43 85 43H14C6.26801 43 0 36.732 0 29V14C0 6.26801 6.26801 0 14 0ZM14 51H85C92.732 51 99 57.268 99 65V80C99 87.732 92.732 94 85 94H14C6.26801 94 0 87.732 0 80V65C0 57.268 6.26801 51 14 51ZM14 2C7.37258 2 2 7.37258 2 14V29C2 35.6274 7.37258 41 14 41H85C91.6274 41 97 35.6274 97 29V14C97 7.37258 91.6274 2 85 2H14ZM14 53C7.37258 53 2 58.3726 2 65V80C2 86.6274 7.37258 92 14 92H85C91.6274 92 97 86.6274 97 80V65C97 58.3726 91.6274 53 85 53H14Z" fill="#2C2D31" />
            </svg>


            <div className="flex flex-col items-center">
               <p className="text-center text-neutral-200 mb-10">{props.message}</p>

               <TwButton onClick={props.onClick}>
                  <div className="flex items-center">
                     <PlusIcon className="relative h-4 w-4 -left-2 text-white" /> {props.buttonName}
                  </div>
               </TwButton>
            </div>
         </div>
      </div>
   );
};

export default Empty;