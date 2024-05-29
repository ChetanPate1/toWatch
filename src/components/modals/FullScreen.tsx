// Core
import React, { Fragment, useState, useImperativeHandle } from "react";
// Third Party
import { Dialog, Transition } from "@headlessui/react";

type Props = {
   reference: any;
   children: React.ReactNode;
   onClose: () => void;
};

const FullScreen = (props: Props) => {
   const [open, setOpen] = useState(false);

   useImperativeHandle(props.reference, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false)
   }));

   return (
      <Transition.Root show={open} as={Fragment}>
         <Dialog as="div" className="relative z-50" onClose={() => { setOpen(false); props.onClose() }}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity backdrop-blur-lg" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                     <Dialog.Panel className="relative w-full transform overflow-hidden shadow-xl transition-all">
                        {props.children}
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

FullScreen.defaultProps = {
   reference: { current: {} },
   onClose: () => { }
};

export default FullScreen;