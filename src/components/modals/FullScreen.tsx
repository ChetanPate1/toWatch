// const FullScreen = (props: Props) => {
//    const [open, setOpen] = useState(false);

//    useImperativeHandle(props.reference, () => ({
//       open: () => setOpen(true),
//       close: () => setOpen(false)
//    }));

//    return (
//       <Transition.Root show={open} as={Fragment}>
//          <Dialog as="div" className="relative z-50" onClose={() => { setOpen(false); props.onClose() }}>
//             <Transition.Child
//                as={Fragment}
//                enter="ease-out duration-300"
//                enterFrom="opacity-0"
//                enterTo="opacity-100"
//                leave="ease-in duration-200"
//                leaveFrom="opacity-100"
//                leaveTo="opacity-0"
//             >
//                <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity backdrop-blur-lg" />
//             </Transition.Child>

//             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                   <Transition.Child
//                      as={Fragment}
//                      enter="ease-out duration-300"
//                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                      enterTo="opacity-100 translate-y-0 sm:scale-100"
//                      leave="ease-in duration-200"
//                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   >
//                      <Dialog.Panel className="relative w-full transform overflow-hidden shadow-xl transition-all">
//                         {props.children}
//                      </Dialog.Panel>
//                   </Transition.Child>
//                </div>
//             </div>
//          </Dialog>
//       </Transition.Root>
//    );
// };

// FullScreen.defaultProps = {
//    reference: { current: {} },
//    onClose: () => { }
// };



// export default FullScreen;


// Core
import React, { useState, useImperativeHandle } from "react";
// Local
import { Dialog, DialogContent, DialogClose, DialogOverlay } from "@/components/ui/dialog";

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
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogOverlay className="bg-transparent" />

         <DialogContent className="max-w-none min-h-full p-0 rounded-none bg-transparent border-none shadow-none backdrop-blur-lg">
            <DialogClose onClick={props.onClose} />

            {props.children}
         </DialogContent>
      </Dialog>
   );
};

FullScreen.defaultProps = {
   reference: { current: {} },
   onClose: () => { }
};

export default FullScreen;
