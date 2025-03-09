import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export function GenericDialog({
  children,
  title,
  description,
  dialogContentClassName,
  dialogFooter,
  dialogTrigger,
  open,
  onOpenChange,
  hideHeader,
  size,
  showCloseButton,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  description?: string;
  dialogContentClassName?: string;
  dialogFooter?: React.ReactNode;
  dialogTrigger?: React.ReactNode;
  open: boolean;
  onOpenChange: () => void;
  hideHeader?: boolean;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
}>) {
  function getModalSize() {
    switch (size) {
      case "sm":
        return "sm:max-w-[425px]";
      case "md":
        return "sm:max-w-[600px]";
      case "lg":
        return "sm:max-w-[800px]";
      default:
        return "sm:max-w-[425px]";
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange();
      }}
    >
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
        }}
        className={`${
          dialogContentClassName && dialogContentClassName
        } ${getModalSize()}`}
      >
        <div className="flex justify-between items-center gap-3">
          {!hideHeader && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          )}
          {showCloseButton && (
            <Button
              variant="default"
              onClick={() => {
                onOpenChange();
              }}
              className="p-2 "
            >
              <X size={15} className="h-12 w-12" />
            </Button>
          )}
        </div>
        {children}
        {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
