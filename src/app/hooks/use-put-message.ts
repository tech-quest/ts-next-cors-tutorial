import { useMutateFetch } from '@/features/app/hooks/use-mutate-fetch';
import { useEffect } from 'react';

export const usePutMessage = () => {
  const {
    data,
    error,
    isLoading: isPutLoading,
    mutate: putMutate,
  } = useMutateFetch<{ id: number; content: string }>('PUT');

  const handlePutMessage = (id: number) => {
    putMutate({ content: 'PUT メッセージ' }, { url: `http://localhost:8000/messages/${id}` });
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

  return { isPutLoading, handlePutMessage };
};
