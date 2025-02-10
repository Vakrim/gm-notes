"use server";

import { z } from "zod";
import {
  createResponseValidator,
  ValidResponse,
} from "../../createResponseValidator";
import * as stories from "../../repos/stories";

const createResponse = createResponseValidator(
  z
    .object({
      id: z.string(),
      name: z.string(),
      notes: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          content: z.string(),
          isPublic: z.boolean(),
        }),
      ),
    })
    .nullable(),
);

export async function getPublicStory(
  storyId: string,
): Promise<ValidResponse<typeof createResponse>> {
  return createResponse(await stories.getStory({ storyId }));
}
