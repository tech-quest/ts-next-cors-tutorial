import { useMutateFetch } from '@/features/app/hooks/use-mutate-fetch';
import { useEffect } from 'react';

export const useDeleteMessage = () => {
  const {
    data,
    error,
    isLoading: isDeleteLoading,
    mutate: deleteMutate,
  } = useMutateFetch<{ id: number; content: string }>('PUT');

  const handleDeleteMessage = (id: number) => {
    deleteMutate({ content: 'DELETE メッセージ' }, { url: `http://localhost:8000/messages/${id}` });
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

  return { isDeleteLoading, handleDeleteMessage };
};
