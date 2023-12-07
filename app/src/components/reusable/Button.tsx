import { ComponentProps, FC } from "react";
import { Button as FBButton } from "flowbite-react";

export const Button: FC<ComponentProps<typeof FBButton>> = (props) => {
  return (
    <FBButton
      theme={{
        size: {
          xs: "text-xs px-2 py-0.5",
          sm: "text-sm px-3 py-1",
          md: "text-sm px-4 py-1.5",
          lg: "text-base px-5 py-2",
          xl: "text-base px-6 py-2.5",
        },
      }}
      {...props}
    />
  );
};
