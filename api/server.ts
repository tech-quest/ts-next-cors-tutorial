import express from 'express';

import { messagesData } from './data';

const app = express();
const port = 8000;

// Middlewares and settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ↓↓↓ アクセスコントロール処理を記述して実際に開発してみましょう！！

// ↑↑↑ アクセスコントロール処理を記述して実際に開発してみましょう！！

app.get('/messages', async (_, res) => {
  return res.json({ data: messagesData });
});

app.get('/messages/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  const message = messagesData.find((msg) => msg.id === id);

  if (!message) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  return res.json({ data: message });
});

app.post('/messages', async (_, res) => {
  // MEMO: POST 処理の動作確認用に擬似的なデータを返却
  return res.json({ data: { id: 3, content: 'POST 動作確認用処理' } });
});

app.put('/messages/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  const message = messagesData.find((msg) => msg.id === id);

  if (!message) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  return res.json({ data: { ...message, content: 'PUT 動作確認用メッセージ' } });
});

app.delete('/messages/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  const message = messagesData.find((msg) => msg.id === id);

  if (!message) {
    return res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
  }

  return res.json({ data: { ...message, content: 'DELETE 動作確認用メッセージ' } });
});

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});
