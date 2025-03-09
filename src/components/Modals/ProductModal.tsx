import { IProduct } from "@/types";
import { GenericDialog } from "./GenericDialog";
import ProductDetails from "../ProductDetails";

export function ProductModal({
  product,
  open,
  openOpenChange,
}: {
  product: IProduct | null;
  open: boolean;
  openOpenChange: () => void;
}) {
  return (
    <GenericDialog
      size="lg"
      open={open}
      onOpenChange={() => {
        openOpenChange();
      }}
      description=""
      title={product?.title}
      showCloseButton
    >
      {product && <ProductDetails isAmdin product={product} />}
    </GenericDialog>
  );
}
