"use server";

import { z } from "zod";
import { getAuthenticatedSession } from "../../auth/getSession";
import {
  createResponseValidator,
  ValidResponse,
} from "../../createResponseValidator";
import * as stories from "../../repos/stories";

const createResponse = createResponseValidator(
  z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
);

export async function getMyStories(): Promise<
  ValidResponse<typeof createResponse>
> {
  const session = await getAuthenticatedSession();

  return createResponse(await stories.getStoriesOfUser(session.id));
}
