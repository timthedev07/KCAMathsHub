export type ErrorStateType<FormDataType> = {
  [key in keyof FormDataType]?: string | undefined;
};

export type ModifyValueType<T, P> = {
  [key in keyof T]: P;
};
