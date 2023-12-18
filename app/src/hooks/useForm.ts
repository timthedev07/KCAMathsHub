import { useCallback, useState } from "react";
import { z } from "zod";
import { filteredError } from "../lib/filterError";
import { validateForm } from "../lib/handleZodErr";
import { ErrorStateType, ModifyValueType } from "../types/ErrorStateType";

type Args<T> = {
  defaultValues: T;
  validationSchema: z.ZodObject<any, any, any>;
};

export const valToBool = <T extends {}>(obj: T, tf: true | false) => {
  const res: Record<string, boolean> = {};
  for (const [key] of Object.entries(obj)) {
    res[key] = tf;
  }
  return res as Record<keyof T, boolean>;
};

export const useForm = <T extends {}>({
  defaultValues,
  validationSchema,
}: Args<T>) => {
  const [formData, setFormData] = useState<T>(() => defaultValues);

  const [changed, setChanged] = useState<ModifyValueType<T, boolean>>(() =>
    valToBool(defaultValues, false)
  );

  const [errors, setErrors] = useState<ErrorStateType<T>>(() => ({}));

  const update = async (name: keyof T, value: any) => {
    let newFormData;

    setFormData((prev) => {
      newFormData = { ...prev, [name]: value };
      return newFormData;
    });

    if (!newFormData) return console.log("new state failed to be captured");

    let newChanged;

    setChanged((prev) => {
      newChanged = { ...prev, [name]: true };
      return newChanged;
    });

    const { success, errors } = await validateForm(
      { [name]: newFormData[name] },
      validationSchema
    );

    if (success || !errors) return setErrors({});
    if (!newChanged) return console.log("new state failed to be captured");

    setErrors(filteredError(errors, newChanged));
  };

  const reset = useCallback(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  return {
    errors,
    changed,
    formData,
    update,
    reset,
  };
};
