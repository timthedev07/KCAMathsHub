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

  const update = useCallback(
    async (name: keyof T, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (!changed[name]) setChanged((prev) => ({ ...prev, [name]: true }));

      const { success, errors } = await validateForm(
        { [name]: formData[name] },
        validationSchema
      );

      console.log("data passed in", { [name]: formData[name] });
      console.log("schema", validationSchema.description);
      console.log("errors", errors);

      if (success || !errors) return setErrors({});

      setErrors(filteredError(errors, changed));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changed, formData]
  );

  return {
    errors,
    setChanged,
    changed,
    formData,
    update,
  };
};
