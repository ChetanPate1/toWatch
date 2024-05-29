// Core
import React, { useState, useImperativeHandle } from "react";
// Local
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

type Props = {
   reference: any;
   title?: string;
   description?: string;
   children: React.ReactNode;
   onClose: () => void;
};

const Base = (props: Props) => {
   const [open, setOpen] = useState(false);

   useImperativeHandle(props.reference, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false)
   }));

   const renderHeader = () => {
      if (props.title || props.description) {
         return (
            <DialogHeader>
               {props.title && <DialogTitle>{props.title}</DialogTitle>}
               {props.description && <DialogDescription>{props.description}</DialogDescription>}
            </DialogHeader>
         );
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-md max-h-3/4 overflow-y-auto">
            {renderHeader()}
            <DialogClose onClick={props.onClose} />

            {props.children}
         </DialogContent>
      </Dialog>
   );
};

Base.defaultProps = {
   reference: { current: {} },
   onClose: () => { }
};

export default Base;
