"use client";

import Image from "next/image";
import { FC } from "react";

interface FullScreenableImgProps extends React.ComponentProps<typeof Image> {}

export const FullScreenableImg: FC<FullScreenableImgProps> = ({
  alt,
  className,
  ...props
}) => {
  return (
    <div>
      <Image {...props} alt={alt} fill={true} className="object-contain" />
    </div>
  );
};
