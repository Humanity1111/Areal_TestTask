<template>
  <div>
    <h2>Comments Analytics</h2>
    <div>
      <label>Date From:</label>
      <input type="date" v-model="dateFrom" />
      <label>Date To:</label>
      <input type="date" v-model="dateTo" />
      <button @click="fetchAnalytics">Filter</button>
    </div>
    <div v-if="analytics.length">
      <div v-for="article in analytics" :key="article.id">
        <h3>{{ article.title }}</h3>
        <ul>
          <li v-for="comment in article.comments" :key="comment.id">
            {{ comment.text }} ({{ comment.createdAt }})
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>No comments found for this period.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      analytics: []
    };
  },
  methods: {
    async fetchAnalytics() {
      if (!this.dateFrom || !this.dateTo) {
        alert('Please select both dates');
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3000/analytic/comments?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`);
        this.analytics = res.data;
      } catch (err) {
        alert('Error fetching analytics: ' + err);
      }
    }
  }
};
</script>
