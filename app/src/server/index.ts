import { router } from "./trpc";
import { updateUsername } from "./crud/initUsername";

export const appRouter = router({
  updateUsername,
});

export type AppRouter = typeof appRouter;
