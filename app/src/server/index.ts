import { router } from "./trpc";
import { updateUsername } from "./crud/user/updateUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferral } from "./crud/user/getReferralId";
import { askQuestion } from "./crud/questions/askQuestion";
import { getQuestion } from "./crud/questions/getQuestion";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferral,
  askQuestion,
  getQuestion,
});

export type AppRouter = typeof appRouter;
