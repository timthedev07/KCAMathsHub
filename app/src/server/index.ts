import { router } from "./trpc";
import { updateUsername } from "./crud/user/initUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferralId } from "./crud/user/getReferralId";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferralId,
});

export type AppRouter = typeof appRouter;
