import { useCallback, useEffect, useState } from 'react';

export function useChatSession(setIsLoggedIn: (value: boolean) => void) {
  const [nickname, setNickname] = useState('');

  const login = useCallback((name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setNickname(trimmed);
    }
  }, []);

  const logout = useCallback(() => {
    setNickname('');
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(nickname.trim()));
  }, [nickname, setIsLoggedIn]);

  return {
    nickname,
    login,
    logout,
  };
}
