import { router } from "./trpc";
import { updateUsername } from "./crud/initUsername";
import { addAttachments } from "./crud/addAttachment";

export const appRouter = router({
  updateUsername,
  addAttachments,
});

export type AppRouter = typeof appRouter;
