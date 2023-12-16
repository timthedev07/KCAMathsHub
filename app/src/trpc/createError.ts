export const createError = (message: string, code: number = 400) => {
  return { message, code, success: false };
};

export const createSuccessResponse = (message: string, code: number = 200) => {
  return { message, code, success: true };
};
