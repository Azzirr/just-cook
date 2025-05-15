import { getCurrentUserId } from "./getCurrentUserId";

export const isCurrentUser = async (userId: string) => {
  const currentUserId = await getCurrentUserId();
  return userId === currentUserId;
};
