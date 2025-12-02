import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '../components/ArticleList.vue';
import ArticleView from '../components/ArticleView.vue';
import CommentAnalytics from '../components/CommentAnalytics.vue';

const routes = [
  { path: '/', name: 'Home', component: ArticleList },
  { path: '/article/:id', name: 'ArticleView', component: ArticleView, props: true },
  { path: '/analytics', name: 'Analytics', component: CommentAnalytics }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
