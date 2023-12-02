import { FC } from "react";
import { Button as FBButton } from "flowbite-react";

export const Button: FC<Parameters<typeof FBButton>[0]> = (props) => {
  return (
    <FBButton
      theme={{
        size: {
          xs: "text-xs px-2 py-1",
          sm: "text-sm px-3 py-1.5",
          md: "text-sm px-4 py-2",
          lg: "text-base px-5 py-2.5",
          xl: "text-base px-6 py-3",
        },
      }}
      {...props}
    />
  );
};
