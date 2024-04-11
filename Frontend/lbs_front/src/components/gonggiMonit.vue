<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class = "title-group">
    <label for="title" class="title-label">공지사항</label>
  </div> 
  <div class="yellow-line"></div>
  <div v-for="post in post" :key="post.iid">
    <GoggiBoardItem :post-id="post.iid" :title="post.title" :created-at="post.createdAt" :content="post.content" />
  </div>
</template>
<script>
import axios from 'axios';
import GoggiBoardItem from '@/components/GoggiBoardItem.vue';
export default {
    components: {
      GoggiBoardItem,
    },
    data() {
        return {
            post: [],
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('/api/board/info');
                this.post = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    
};
</script>
<style scoped>
.title-group {
  display: flex;
  justify-content: left;
  margin-top: 2vw;
  font-family: 'NanumSquareNeo';
}

.title-label {
  font-size: 2vw; /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-left: 1vw; /* 상대적인 단위로 변경 */
}
</style>