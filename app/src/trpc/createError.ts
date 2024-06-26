export const createError = (
  message: string = "Bad request",
  code: number = 400
) => {
  return { message, code, data: null, success: false };
};

export const createSuccessResponse = <T>(
  message: string = "Action succeeded",
  data?: T,
  code: number = 200
) => {
  return { message, code, data, success: true };
};
