<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>작성일: {{ post.createdAt }}</p>
    <button @click="goBack">목록으로 돌아가기</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
props: ['postId'],
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.fetchPost();
  },
mounted() {
  window.addEventListener('keydown', this.handleKeydown);
},
beforeUnmount() {
  window.removeEventListener('keydown', this.handleKeydown);
},
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`/api/board/QnA/${this.postId}`);
        this.post = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  goBack() {
    this.$emit('goBack');
  },
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.goBack();
    }
  },
  },
};
</script>