export interface ChatHeaderProps {
  nickname: string;
  onlineUsers: number;
  onLogout: () => void;
}