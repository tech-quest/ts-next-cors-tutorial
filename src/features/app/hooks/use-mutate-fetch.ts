import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ErrorResponse = {
  message: string;
};

export const useMutateFetch = <T>(method: string, initialOptions?: { url?: string }) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleError = async (res: Response) => {
    try {
      const json = await res.json();

      if (res.status === 404 && json.error) {
        router.push('/not-found');
        return;
      }
      setError(json.error ?? { message: '原因不明のエラーが発生しました。' });
      return;
    } catch {
      setError({ message: '原因不明のエラーが発生しました。' });
    }
  };

  const setStatesWhenStartFetching = () => {
    setData(null);
    setError(null);
    setIsLoading(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutate = async (values?: any, options?: { url?: string }) => {
    const body = JSON.stringify(values);

    setStatesWhenStartFetching();

    const configs: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    };

    const url = options?.url || initialOptions?.url;

    if (!url) {
      setError({
        message: 'URLが指定されていません。',
      });
      return;
    }

    return await fetch(url, { ...configs, body })
      .then(async (res) => {
        if (!res.ok) {
          handleError(res);
          return;
        }

        const json: { data: T } = await res.json();
        setData(json.data);
      })
      .catch(() => {
        setError({
          message: '通信エラーが発生しました。ネットワーク環境を確認するか、時間を置いて再度アクセスしてください。',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, error, isLoading, mutate };
};
