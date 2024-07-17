'use client';

import Link from 'next/link';
import { useFetchMessages } from './hooks/use-fetch-messages';
import { usePostMessage } from './hooks/use-post-message';

import styles from './styles.module.css';
import { usePutMessage } from './hooks/use-put-message';
import { useDeleteMessage } from './hooks/use-delete-message';

export default function Home() {
  const { messages, getError, isGetLoading } = useFetchMessages();

  const { isPostLoading, handlePostMessage } = usePostMessage();
  const { isPutLoading, handlePutMessage } = usePutMessage();
  const { isDeleteLoading, handleDeleteMessage } = useDeleteMessage();

  if (isGetLoading) {
    return <div>読み込み中...</div>;
  }

  if (getError) {
    return <div>エラーが発生しました「{getError.message}」</div>;
  }

  return (
    <div>
      <h1>メッセージ一覧</h1>
      {messages ? (
        <div className={styles.container}>
          <ul className={styles.list}>
            {messages.map((message) => (
              <li key={message.id}>
                <div className={styles.item}>
                  <Link href={`/${message.id}`}>{message.content}</Link>
                  <button type="button" onClick={() => handlePutMessage(message.id)}>
                    PUT 動作確認
                  </button>
                  <button type="button" onClick={() => handleDeleteMessage(message.id)}>
                    DELETE 動作確認
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button type="button" onClick={handlePostMessage} disabled={isPostLoading}>
              POST 動作確認
            </button>
          </div>
          {(isPostLoading || isPutLoading || isDeleteLoading) && <div className={styles.layer}>送信中...</div>}
        </div>
      ) : (
        <div>データがありません</div>
      )}
    </div>
  );
}
