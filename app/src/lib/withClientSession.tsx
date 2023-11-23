import { SessionProvider } from "next-auth/react";
import { FC } from "react";

export const withClientSession = <T extends {}>(Component: FC<T>): FC<T> => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <SessionProvider>{<Component {...props} />}</SessionProvider>
  );
};
