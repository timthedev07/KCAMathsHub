import { router } from "./trpc";
import { updateUsername } from "./crud/user/updateUsername";
import { addAttachments } from "./crud/questions/addAttachment";
import { initReferral } from "./crud/user/initReferral";
import { getReferral } from "./crud/user/getReferralId";
import { askQuestion } from "./crud/questions/askQuestion";
import { getQuestion } from "./crud/questions/getQuestion";
import { getQuestions } from "./crud/questions/getQuestions";
import { getUser } from "./crud/user/getUser";
import { getReferralEntity } from "./crud/user/getReferralEntity";
import { updateBio } from "./crud/user/updateBio";
import { getUserDisplayQuestions } from "./crud/questions/getUserDisplayQs";
import { getExistingCategories } from "./crud/categories/getCategories";
import { deleteQuestion } from "./crud/questions/deleteQuestion";

export const appRouter = router({
  updateUsername,
  addAttachments,
  initReferral,
  getReferral,
  askQuestion,
  getQuestion,
  getQuestions,
  getUser,
  getReferralEntity,
  updateBio,
  getUserDisplayQuestions,
  getExistingCategories,
  deleteQuestion,
});

export type AppRouter = typeof appRouter;

export const SSRCaller = appRouter.createCaller({});
