import { FileIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
  title?: string;
};

const EmptyState = ({ title = "No data" }: Props) => {
  return (
    //use tailwind css to style the component with an empty state icon
    <div className="flex flex-col items-center justify-center h-full">
      <FileIcon className="w-14 h-14 text-gray-400" />
      <h2 className="mt-2 text-lg font-medium text-gray-400">{title}</h2>
    </div>
  );
};

export default EmptyState;
