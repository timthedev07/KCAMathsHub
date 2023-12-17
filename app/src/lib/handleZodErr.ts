import { ZodError, z } from "zod";
import { valToBool } from "../hooks/useForm";

declare type allKeys<T> = T extends any ? keyof T : never;

export const validateForm = async <
  T extends z.ZodRawShape,
  P extends z.UnknownKeysParam,
  U extends z.ZodTypeAny
>(
  data: any,
  schema: z.ZodObject<T, P, U>
): Promise<{
  success: boolean;
  errors?: {
    [_ in allKeys<z.objectOutputType<T, U, P>>]?: string | undefined;
  };
}> => {
  try {
    await schema
      .partial()
      .required(valToBool(data, true) as any)
      .parseAsync(data);

    return {
      success: true,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      let errs = (err as ZodError<z.infer<typeof schema>>).flatten()
        .fieldErrors;
      for (const [key, value] of Object.entries(errs)) {
        (errs as any)[key] = (value as any)[0];
      }
      return {
        success: false,
        errors: errs as any,
      };
    } else {
      console.log(err);
      return { success: false };
    }
  }
};
