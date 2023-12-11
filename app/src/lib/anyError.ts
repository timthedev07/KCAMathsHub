import { ErrorStateType, ModifyValueType } from "../types/ErrorStateType";

export const anyError = <T>(
  errors: ErrorStateType<T>,
  changed: ModifyValueType<T, boolean>
) => {
  for (const [k, v] of Object.entries(errors)) {
    if (!(changed as any)[k] || v) return true;
  }
};
