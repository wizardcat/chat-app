import { useCallback, useState } from 'react';

export function useChatSession() {
  const [nickname, setNickname] = useState('');

  const isLoggedIn = Boolean(nickname.trim());

  const login = useCallback((name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setNickname(trimmed);
    }
  }, []);

  const logout = useCallback(() => {
    setNickname('');
  }, []);

  return {
    nickname,
    isLoggedIn,
    login,
    logout,
  };
}
