import Image from "next/image";
import React from "react";

type Props = {
  title?: string;
  customElement?: React.ReactNode;
};

const EmptyState = ({ title = "No data", customElement }: Props) => {
  return (
    //use tailwind css to style the component with an empty state icon
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/images/empty-box.png" height={200} width={200} alt="404" />
      {!customElement && (
        <h2 className="mt-2 text-lg font-medium text-gray-400">{title}</h2>
      )}
      {customElement}
    </div>
  );
};

export default EmptyState;
