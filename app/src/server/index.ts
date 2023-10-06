import { router } from "./trpc";
import { updateUsername } from "./crud/user/initUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
});

export type AppRouter = typeof appRouter;
