import { router } from "./trpc";
import { updateUsername } from "./crud/user/updateUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferral } from "./crud/user/getReferralId";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferralId: getReferral,
});

export type AppRouter = typeof appRouter;
