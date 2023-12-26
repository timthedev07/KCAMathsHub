export type ErrorStateType<FormDataType> = {
  [_ in keyof FormDataType]?: string | undefined;
};

export type ModifyValueType<T, P> = {
  [_ in keyof T]: P;
};
