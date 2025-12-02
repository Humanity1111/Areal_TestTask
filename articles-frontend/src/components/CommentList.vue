<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
        <button @click="editComment(comment)">Edit</button>
        <button @click="deleteComment(comment.id)">Delete</button>
      </li>
    </ul>
    <!-- Компонент формы для добавления комментариев -->
    <CommentForm :articleId="articleId" @commentAdded="fetchComments" />
  </div>
</template>

<script>
import axios from 'axios';
import CommentForm from './CommentForm.vue';

export default {
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  components: { CommentForm },
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const res = await axios.get(`http://localhost:3000/article/${this.articleId}/comments`);
        this.comments = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteComment(id) {
      try {
        await axios.delete(`http://localhost:3000/article/${this.articleId}/comment/${id}`);
        this.fetchComments();
      } catch (err) {
        console.error(err);
      }
    },
    editComment(comment) {
      // здесь можно открыть форму редактирования или эмитить событие
      this.$emit('editComment', comment);
    }
  }
};
</script>
