import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

export const withClientSession = <T extends { session: Session | null }>(
  Component: FC<T>
): FC<T> => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <SessionProvider session={props.session}>
      {<Component {...props} />}
    </SessionProvider>
  );
};
