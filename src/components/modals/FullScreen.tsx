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
