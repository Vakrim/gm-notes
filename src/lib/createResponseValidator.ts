import { ZodTypeAny, ZodBranded, z } from "zod";

export type ValidResponse<T extends (params: never) => z.BRAND<"response">> =
  ReturnType<T>;

export function createResponseValidator<T extends ZodTypeAny>(schema: T) {
  return (
    response: z.infer<typeof schema>,
  ): z.infer<ZodBranded<T, "response">> =>
    schema.brand("response").parse(response);
}
