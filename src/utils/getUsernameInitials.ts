export const getUsernameInitials = (username: string) => {
  return username.substring(0, 2).toUpperCase();
};
