<template>
  <div>
    <h2>{{ article.id ? 'Edit Article' : 'New Article' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>Title:</label>
        <input v-model="article.title" required />
      </div>
      <div>
        <label>Text:</label>
        <textarea v-model="article.text" required></textarea>
      </div>
      <button type="submit">{{ article.id ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    article: {
      type: Object,
      default: () => ({ title: '', text: '' })
    }
  },
  methods: {
    async submit() {
      try {
        if (this.article.id) {
          const res = await axios.patch(`http://localhost:3000/article/${this.article.id}`, this.article);
          alert('Article updated');
        } else {
          const res = await axios.post('http://localhost:3000/article', this.article);
          alert('Article created');
        }
      } catch (err) {
        alert('Error: ' + err);
      }
    }
  }
};
</script>
