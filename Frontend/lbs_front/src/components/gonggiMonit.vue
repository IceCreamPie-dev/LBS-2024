<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="title-group">
    <label for="title" class="title-label">공지사항</label>
  </div>
  <div class="yellow-line"></div>
  <div v-if=role> <!-- 관리자 게시물 생성 기능이 보임 왼쪼 정렬-->
    <button class="post-add-button" @click="clickAddPost = true">게시물 생성</button>
  </div>
  <div v-if=isListMode>
    <div v-for="post in post" :key="post.iid">
      <GoggiBoardItem :post-id="post.iid" :title="post.title" :createdAt="post.created_at" :content="post.content"
        :role="role" @click="selectedPostID" />
    </div>
  </div>
  <div v-else-if=isDetailMode>
    <GoggiPostDetail :post-id="selectedPostID" />
    디테일 모드라네
  </div>
  <div v-else-if=isCreateMode>
    효효효
  </div>
  {{ selectedPostID }}
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import GoggiBoardItem from '@/components/GoggiBoardItem.vue';
import GoggiPostDetail from '@/components/GoggiPostDetail.vue';
export default {
  components: {
    GoggiBoardItem,
    GoggiPostDetail
  },
  data() {
    return {
      post: [],
      isDetailMode: false,
      isCreateMode: false,
      isListMode: true,
      selectedPostID: null,
      role: false,
    };
  },
  created() {
    this.fetchPosts();
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogin = true;
      const decoded = jwtDecode(token);
      this.role = decoded.role.toString() === '1' ? true : false;
    }
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
    clickAddPost() {
      this.isDetailMod = false;
      this.isListMode = false;
      this.isCreateMode = true;
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
  font-size: 2vw;
  /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-left: 1vw;
  /* 상대적인 단위로 변경 */
}

.post-add-button{
  /* 게시물 생성 버튼 */
  background-color: #FFD700;
  color: #484848;
  border: none;
  border-radius: 3px;
  padding: 10px;
  margin-left: 1vw;
  cursor: pointer;
  font-family: 'NanumSquareNeo';
  font-size: 1vw;
}
</style>