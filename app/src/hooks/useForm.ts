import { useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      const { success, errors } = await validateForm(
        formData,
        validationSchema
      );

      if (success || !errors) return setErrors({});

      setErrors(filteredError(errors, changed));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const update = async (name: keyof T, value: any) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    setChanged((prev) => {
      return { ...prev, [name]: true };
    });
  };

  const reset = () => {
    setFormData(defaultValues);
  };

  return {
    errors,
    changed,
    formData,
    update,
    reset,
  };
};
