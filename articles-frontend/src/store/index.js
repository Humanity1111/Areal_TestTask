import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    articles: [],
    comments: []
  },
  mutations: {
    setArticles(state, articles) { state.articles = articles; },
    setComments(state, comments) { state.comments = comments; }
  },
  actions: {
    async fetchArticles({ commit }) {
      const res = await axios.get('http://localhost:3000/articles');
      commit('setArticles', res.data);
    },
    async fetchComments({ commit }, articleId) {
      const res = await axios.get(`http://localhost:3000/article/${articleId}/comments`);
      commit('setComments', res.data);
    }
  },
  getters: {
    articles: state => state.articles,
    comments: state => state.comments
  }
});
