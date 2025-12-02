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
    <CommentForm :articleId="articleId" @commentAdded="fetchComments" />
  </div>
</template>

<script>
import axios from 'axios';
import CommentForm from './CommentForm.vue';

export default {
  components: { CommentForm },
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
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
        alert('Error fetching comments: ' + err);
      }
    },
    editComment(comment) {
      this.$emit('edit', comment);
    },
    async deleteComment(id) {
      if (confirm('Delete this comment?')) {
        try {
          aw
