export const getAvatarUrl = (nickname: string): string => {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(nickname)}`;
};
