import { unauthorized } from "next/navigation";
import { CurrentUser, getAuthenticatedSession } from "../auth/getSession";

export function createAuthorizationFunction<T>(
  authorizationFunction: (user: CurrentUser, resource: T) => Promise<boolean>,
): (resource: T) => Promise<void> {
  return async function (resource: T) {
    const user = await getAuthenticatedSession();

    if (!user) {
      unauthorized();
    }

    const isAuthorized = await authorizationFunction(user, resource);

    if (!isAuthorized) {
      unauthorized();
    }
  };
}
