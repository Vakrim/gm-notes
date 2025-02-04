import { ZodError } from "zod";

export function assertValid<T>(value: T | ZodError): asserts value is T {
  if (value instanceof ZodError) {
    throw new Error(value.message);
  }
}
