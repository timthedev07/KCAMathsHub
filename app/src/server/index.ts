import { router } from "./trpc";
import { updateUsername } from "./crud/user/updateUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferral } from "./crud/user/getReferralId";
import { askQuestion } from "./crud/questions/askQuestion";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferral,
  askQuestion,
});

export type AppRouter = typeof appRouter;
