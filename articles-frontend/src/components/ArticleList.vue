<template>
  <div>
    <h2>Articles</h2>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <strong>{{ article.title }}</strong>
        <button @click="editArticle(article.id)">Edit</button>
        <button @click="viewArticle(article.id)">View</button>
        <button @click="deleteArticle(article.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const res = await axios.get('http://localhost:3000/articles');
        this.articles = res.data;
      } catch (err) {
        alert('Error fetching articles: ' + err);
      }
    },
    editArticle(id) {
      this.$router.push({ name: 'ArticleView', params: { id } });
    },
    viewArticle(id) {
      this.$router.push({ name: 'ArticleView', params: { id } });
    },
    async deleteArticle(id) {
      if (confirm('Delete this article?')) {
        try {
          await axios.delete(`http://localhost:3000/article/${id}`);
          this.fetchArticles();
        } catch (err) {
          alert('Error deleting article: ' + err);
        }
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
button {
  margin-left: 5px;
}
</style>
