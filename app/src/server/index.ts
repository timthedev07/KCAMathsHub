import { router } from "./trpc";
import { updateUsername } from "./crud/user/initUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferralId } from "./crud/user/getReferralId";
import { acceptReferral } from "./crud/user/acceptReferral";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferralId,
  acceptReferral,
});

export type AppRouter = typeof appRouter;
