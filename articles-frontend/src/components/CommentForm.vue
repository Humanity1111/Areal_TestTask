<template>
  <div>
    <h4>Add Comment</h4>
    <form @submit.prevent="submitComment">
      <textarea v-model="text" placeholder="Write a comment..." required></textarea>
      <button type="submit">Add Comment</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    async submitComment() {
      try {
        await axios.post(`http://localhost:3000/article/${this.articleId}/comment`, { text: this.text });
        this.text = '';
        this.$emit('commentAdded');
      } catch (err) {
        alert('Error adding comment: ' + err);
      }
    }
  }
};
</script>
