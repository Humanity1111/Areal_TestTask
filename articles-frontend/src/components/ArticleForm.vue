<template>
  <div>
    <h2>{{ localArticle.id ? 'Edit Article' : 'New Article' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>Title:</label>
        <input v-model="localArticle.title" required />
      </div>
      <div>
        <label>Text:</label>
        <textarea v-model="localArticle.text" required></textarea>
      </div>
      <button type="submit">{{ localArticle.id ? 'Update' : 'Create' }}</button>
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
  data() {
    return {
      localArticle: { ...this.article } // создаём локальную копию
    };
  },
  methods: {
    async submit() {
      try {
        if (this.localArticle.id) {
          await axios.patch(`http://localhost:3000/article/${this.localArticle.id}`, this.localArticle);
          alert('Article updated');
        } else {
          await axios.post('http://localhost:3000/article', this.localArticle);
          alert('Article created');
        }
        this.$emit('articleSaved');
      } catch (err) {
        alert('Error: ' + err);
      }
    }
  }
};
</script>
