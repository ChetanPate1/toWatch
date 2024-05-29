// Core
import React, { useState, useImperativeHandle } from "react";
// Local
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
   reference: any;
   text?: string;
   onConfirm: () => void;
   onCancel?: () => void;
};

const Confirm = (props: Props) => {
   const { text = 'Are you sure?', onCancel = () => { } } = props;
   const [open, setOpen] = useState(false);

   useImperativeHandle(props.reference, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false)
   }));

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-sm">
            <DialogTitle>Confirm</DialogTitle>

            <div className="mt-2 mb-4">
               <p className="text-sm text-gray-500">
                  {text}
               </p>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={onCancel}>
                     Cancel
                  </Button>
               </DialogClose>

               <Button type="button" onClick={props.onConfirm}>
                  Confirm
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default Confirm;
