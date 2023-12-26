"use client";

import { inferProcedureOutput } from "@trpc/server";
import React, { PropsWithChildren, useContext } from "react";
import { getUserAnswers } from "../../server/crud/answers/getUserAnswers";
import { trpc } from "../../trpc/client";
import { Status } from "../../types/TRPCQueryStatus";

interface AListDataContextType {
  data?: inferProcedureOutput<typeof getUserAnswers>;
  status: Status;
}
const AListDataContext = React.createContext<AListDataContextType>({
  status: "loading",
});

export const useAListData = () => {
  return useContext(AListDataContext);
};

export const AListDataProvider: React.FC<
  PropsWithChildren<{ uid?: string | null }>
> = ({ children, uid }) => {
  const { data, status } = trpc.getUserAnswers.useQuery(
    { uid: uid! },
    { enabled: !!uid }
  );

  const value: AListDataContextType = {
    data,
    status,
  };

  return (
    <AListDataContext.Provider value={value}>
      {children}
    </AListDataContext.Provider>
  );
};
