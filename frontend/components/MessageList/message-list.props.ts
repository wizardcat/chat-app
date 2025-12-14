import { Message } from '@/types';

export interface MessageListProps {
  messages: Message[];
  currentNickname: string;
  isLoading: boolean;
}