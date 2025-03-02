import { FileIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

type Props = {
  title?: string;
};

const EmptyState = ({ title = "No data" }: Props) => {
  return (
    //use tailwind css to style the component with an empty state icon
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/images/empty-box.png" height={200} width={200} alt="404" />
      <h2 className="mt-2 text-lg font-medium text-gray-400">{title}</h2>
    </div>
  );
};

export default EmptyState;
