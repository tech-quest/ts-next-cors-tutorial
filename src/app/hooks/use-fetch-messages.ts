import { useGetFetch } from '@/features/app/hooks/use-get-fetch';
import { useEffect } from 'react';

export const useFetchMessages = () => {
  const {
    data: messages,
    error: getError,
    isLoading: isGetLoading,
    query,
  } = useGetFetch<{ id: number; content: string }[]>('http://localhost:8000/messages');

  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { messages, getError, isGetLoading };
};
