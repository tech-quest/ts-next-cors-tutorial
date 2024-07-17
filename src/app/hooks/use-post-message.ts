import { useMutateFetch } from '@/features/app/hooks/use-mutate-fetch';
import { useEffect } from 'react';

export const usePostMessage = () => {
  const {
    data,
    error,
    isLoading: isPostLoading,
    mutate: postMutate,
  } = useMutateFetch<{ id: number; content: string }>('POST', { url: 'http://localhost:8000/messages' });

  const handlePostMessage = () => {
    postMutate();
  };

  useEffect(() => {
    if (data) {
      alert(`ID: ${data.id}, ${data.content}`);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(`エラーが発生しました「${error.message}」`);
    }
  }, [error]);

  return { isPostLoading, handlePostMessage };
};
