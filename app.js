const express = require('express');
const bodyParser = require('body-parser');
const { Article, Comment } = require('./models');
const { Op } = require('sequelize');

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.post('/article', async (req, res) => {
  const { title, text } = req.body;
  try {
    const article = await Article.create({ title, text });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/article/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, { include: 'comments' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/article/:id', async (req, res) => {
  const { title, text } = req.body;
  try {
    await Article.update({ title, text }, { where: { id: req.params.id } });
    const updated = await Article.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/article/:id', async (req, res) => {
  try {
    await Article.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/article/:id/comment', async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.create({ text, articleId: req.params.id });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/article/:id/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/article/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { articleId: req.params.id } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/article/:id/comment/:commentId', async (req, res) => {
  const { text } = req.body;
  try {
    await Comment.update({ text }, { where: { id: req.params.commentId } });
    const updated = await Comment.findByPk(req.params.commentId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/article/:id/comment/:commentId', async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.commentId } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/analytic/comments', async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  try {
    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(dateFrom), new Date(dateTo)]
        }
      },
      include: { model: Article, as: 'article' }
    });

    const result = {};
    comments.forEach(c => {
      const articleId = c.article.id;
      if (!result[articleId]) result[articleId] = [];
      result[articleId].push(c);
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
