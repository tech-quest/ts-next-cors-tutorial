import { createTestMessages } from './test-messages';

// テストデータ登録用関数
const seed = async () => {
  await createTestMessages();
};

seed();
