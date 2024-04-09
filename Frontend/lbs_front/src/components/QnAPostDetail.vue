<template>
    <div>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p>작성일: {{ post.createdAt }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        post: {},
      };
    },
    created() {
      const postId = this.$route.params.postId;
      this.fetchPost(postId);
    },
    methods: {
      async fetchPost(postId) {
        try {
          const response = await axios.get(`/api/board/QnA/${postId}`);
          this.post = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>