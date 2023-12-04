import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

export const withClientSession = <T,>(Component: FC<T>) => {
  // eslint-disable-next-line react/display-name
  return (props: T & { session: Session | null }) => (
    <SessionProvider session={props.session}>
      {<Component {...props} />}
    </SessionProvider>
  );
};
