// Core
import { Fragment, useState, useImperativeHandle } from "react";
// Third Party
import { Dialog, Transition } from "@headlessui/react";
import TwButton from "@/components/base/TwButton";

type Props = {
   reference: any;
   text: string;
   onConfirm: () => void;
   onCancel: () => void;
   onClose: () => void;
};

const Confirm = (props: Props) => {
   const [open, setOpen] = useState(false);

   useImperativeHandle(props.reference, () => ({
      open: () => setOpen(true)
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
               <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" />
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
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                           <div className="text-center">
                              <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                 Confirm
                              </Dialog.Title>
                              <div className="mt-2">
                                 <p className="text-sm text-gray-500">
                                    {props.text}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="mt-5 sm:mt-6 flex justify-between">
                           <TwButton type="button" className="bg-neutral-100 hover:bg-neutral-200 !text-black" onClick={() => { setOpen(false); props.onCancel() }}>
                              Cancel
                           </TwButton>

                           <TwButton type="button" className="bg-red-500 hover:bg-red-600" onClick={() => { setOpen(false); props.onConfirm() }}>
                              Confirm
                           </TwButton>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

Confirm.defaultProps = {
   reference: { current: {} },
   text: "Are you sure?",
   onCancel: () => { },
   onClose: () => { }
};

export default Confirm;
