import { answerQuestion } from "./crud/answers/answerQuestion";
import { deleteAnswer } from "./crud/answers/deleteAnswer";
import { getQuestionAnswers } from "./crud/answers/getQuestionAnswers";
import { deleteAttachment } from "./crud/attachments/deleteAttachment";
import { getExistingCategories } from "./crud/categories/getCategories";
import { addAttachments } from "./crud/questions/addAttachment";
import { askQuestion } from "./crud/questions/askQuestion";
import { deleteQuestion } from "./crud/questions/deleteQuestion";
import { getQuestion } from "./crud/questions/getQuestion";
import { getQuestions } from "./crud/questions/getQuestions";
import { getUserDisplayQuestions } from "./crud/questions/getUserDisplayQs";
import { markAsAnswered } from "./crud/questions/markAsAnswered";
import { updateQuestion } from "./crud/questions/updateQuestion";
import { getReferralEntity } from "./crud/user/getReferralEntity";
import { getReferral } from "./crud/user/getReferralId";
import { getUser } from "./crud/user/getUser";
import { initReferral } from "./crud/user/initReferral";
import { updateBio } from "./crud/user/updateBio";
import { updateUsername } from "./crud/user/updateUsername";
import { router } from "./trpc";

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
  deleteAttachment,
  updateQuestion,
  markAsAnswered,
  answerQuestion,
  getQuestionAnswers,
  deleteAnswer,
});

export type AppRouter = typeof appRouter;

export const SSRCaller = appRouter.createCaller({});
