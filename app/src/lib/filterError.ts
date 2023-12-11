import { ErrorStateType, ModifyValueType } from "../types/ErrorStateType";

export const filteredError = <T>(
  errors: ErrorStateType<T>,
  changed: ModifyValueType<T, boolean>
) => {
  const res: any = {};
  for (const [k, v] of Object.entries(errors)) {
    res[k] = (changed as any)[k] ? v : undefined;
  }
  return res as typeof errors;
};
