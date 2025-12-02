<template>
  <div v-if="article">
    <h2>{{ article.id ? 'Edit Article' : 'New Article' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>Title:</label>
        <input v-model="localArticle.title" required />
      </div>
      <div>
        <label>Text:</label>
        <textarea v-model="localArticle.text" required></textarea>
      </div>
      <button type="submit">{{ article.id ? 'Update' : 'Create' }}</button>
    </form>

    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      article: null,
      localArticle: { title: '', text: '' },
      comments: []
    };
  },
  mounted() {
    this.fetchArticle();
  },
  watch: {
    '$route.params.id': 'fetchArticle'
  },
  methods: {
    async fetchArticle() {
      const id = this.$route.params.id;
      if (!id) return;

      try {
        const res = await axios.get(`http://localhost:3000/article/${id}`);
        this.article = res.data;
        this.localArticle = { ...this.article };

        const commentsRes = await axios.get(`http://localhost:3000/article/${id}/comments`);
        this.comments = commentsRes.data;
      } catch (err) {
        alert('Error fetching article: ' + err);
      }
    },
    async submit() {
      try {
        if (this.article.id) {
          await axios.patch(`http://localhost:3000/article/${this.article.id}`, this.localArticle);
          alert('Article updated');
          this.fetchArticle();
        } else {
          const res = await axios.post('http://localhost:3000/article', this.localArticle);
          alert('Article created');
          this.$router.push(`/article/${res.data.id}`);
        }
      } catch (err) {
        alert('Error: ' + err);
      }
    }
  }
};
</script>
