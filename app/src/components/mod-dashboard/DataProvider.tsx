"use client";

import { InfiniteData } from "@tanstack/react-query";
import { type inferProcedureOutput } from "@trpc/server";
import React, { PropsWithChildren, useContext } from "react";
import {
  getAllAnswers,
  getDashboardUserModerations,
} from "../../server/crud/moderations/getDashboardModerations";
import { trpc } from "../../trpc/client";
import { Status } from "../../types/TRPCQueryStatus";

type K<T> = {
  data: InfiniteData<inferProcedureOutput<T>> | undefined;
  status: Status;
  fetchNextPage: () => void;
};

interface ModDashboardDataContextType {
  userMods: K<typeof getDashboardUserModerations>;
  answers: K<typeof getAllAnswers>;
}

const defaultCtx = {
  data: undefined,
  fetchNextPage() {},
  status: "loading" as Status,
};

const ModDashboardDataContext =
  React.createContext<ModDashboardDataContextType>({
    answers: defaultCtx,
    userMods: defaultCtx,
  });

export const useModDashboardData = () => {
  return useContext(ModDashboardDataContext);
};

export const ModDashboardDataProvider: React.FC<
  PropsWithChildren<{ uid?: string }>
> = ({ children, uid }) => {
  const userQ = trpc.getDashboardUserModerations.useInfiniteQuery(
    { uid: uid! },
    { enabled: !!uid }
  );
  const answers = trpc.getAllAnswers.useInfiniteQuery(
    { uid: uid! },
    { enabled: !!uid }
  );

  const value: ModDashboardDataContextType = {
    userMods: userQ,
    answers: answers,
  };

  return (
    <ModDashboardDataContext.Provider value={value}>
      {children}
    </ModDashboardDataContext.Provider>
  );
};
