<template>
  <div class="post-details">
    <form class="post-form">
      <h2 class="post-title">{{ post.title }}</h2>
      <pre class="post-content">{{ post.content }}</pre>
    </form>
    <div class="post-btn">
    <button @click="goBack" class="back-button">목록으로 돌아가기</button>
  </div>
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
    this.fetchPostDetail();
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    async fetchPostDetail() {
      try {
        const response = await axios.get(`/api/board/info/${this.postId}`);
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

<style scoped>
.post-details {
  max-width: 100%;
  height: 90%;
  margin: 0 auto;
  margin-top: 2.7%;
  padding: 1%; 
  background-color: #fff;
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.post-form{
  margin: 0 auto; 
  margin: 2%;
  width: 92%;
  height: 90%;
  color: #605548;
  padding: 1.5%;
  border-radius: 10px;
  font-family: 'NanumSquareNeo';

}
.post-title {
  font-size: 24px; 
  padding: 1%;
  font-weight: bold; 
  color: #605548;
  margin-bottom: 2%;
  border-bottom: #FFDE80 3px solid;
}

.post-content {
  font-size: 16px; 
  height: 90%;
  color: #80776D; 
  margin-bottom: 20px; 
  white-space: pre-wrap;
}

.post-btn{

  text-align: center;
}

.back-button {
  display: inline-block;
  font-family: 'NanumSquareNeobold';
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFDE80;
  color: #605548;
  border: none; 
  border-radius: 5px;
  cursor: pointer; 
  transition: background-color 0.3s; /* 호버 효과 애니메이션 */
}

.back-button:hover {
  background-color: #FFCE55; /* 호버 시 배경색 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}
</style>