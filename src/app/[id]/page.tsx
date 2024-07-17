'use client';

import { useGetFetch } from '@/features/app/hooks/use-get-fetch';
import { useEffect } from 'react';

type Params = {
  id: string;
};

export default function Id({ params }: { params: Params }) {
  const { data, error, isLoading, query } = useGetFetch<{ id: string; content: string }>(
    `http://localhost:8000/messages/${params.id}`,
  );

  useEffect(() => {
    query();
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラーが発生しました「{error.message}」</div>;
  }

  return (
    <div>
      {data && (
        <div>
          <h1>メッセージ</h1>
          <div>{data.content}</div>
        </div>
      )}
    </div>
  );
}
