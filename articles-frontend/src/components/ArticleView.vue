<template>
  <div>
    <ArticleForm :article="article" />
    <CommentList :articleId="article.id" />
  </div>
</template>

<script>
import axios from 'axios';
import ArticleForm from './ArticleForm.vue';
import CommentList from './CommentList.vue';

export default {
  components: { ArticleForm, CommentList },
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      article: {}
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      try {
        const res = await axios.get(`http://localhost:3000/article/${this.articleId}`);
        this.article = res.data;
      } catch (err) {
        alert('Error fetching article: ' + err);
      }
    }
  }
};
</script>
