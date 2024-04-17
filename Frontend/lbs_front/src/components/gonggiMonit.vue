<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="title-group">
    <label for="title" class="title-label">공지사항</label>
  </div>
  <div class="yellow-line"></div>
  <div v-if=isListMode>
    <div v-if=role> <!-- 관리자 게시물 생성 기능이 보임 왼쪼 정렬-->
    <button class="post-add-button" @click="clickAddPostMod">게시물 생성</button>
  </div>
    <div v-for="post in post" :key="post.iid">
      <GoggiBoardItem :post-id="post.iid" :title="post.title" :createdAt="post.created_at" :content="post.content"
        :role="role" @onPostClick="onPostClick" @deletePost="deletePost" @clickEditPost="clickEditPost"/>
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">다음</button>
    </div>
  </div>
  <div v-else-if=isDetailMode>
    <GoggiPostDetail :post-id="selectedPostID" @goBack="goBack"/>
  </div>
  <div v-else-if=isCreateMode>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" class="form-control" placeholder="제목을 입력하세요">
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" class="form-control" placeholder="내용을 입력하세요"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="createPost">등록</button>
      <button type="button" class="btn btn-secondary" @click="goBack">취소</button>
    </form>
  </div>
  <div v-else-if=isEditMode>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" class="form-control" placeholder="제목을 입력하세요">
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" class="form-control" placeholder="내용을 입력하세요"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="editPost">수정</button>
      <button type="button" class="btn btn-secondary" @click="goBack">취소</button>
    </form>
  </div>
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
      isEditMode: false,
      isListMode: true,
      selectedPostID: null,
      role: false,
      currentPage: 1,
      totalPages: 0,
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
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchPosts();
    },
    async fetchPosts() {
      try {
        const response = await axios.get('/api/board/info', {
          params: {
            page: this.currentPage,
          },
        });
        this.post = response.data;
        this.totalPages = response.headers['x-total-pages'];
      } catch (error) {
        console.error(error);
      }
    },
    async createPost() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/board/info', {
          title: this.title,
          content: this.content,
        }, {
          headers: {
        'Authorization': token
      }
        });
        this.post = response.data;
        this.isCreateMode = false;
        this.isListMode = true;

        this.fetchPosts();
      } catch (error) {
        console.error(error);
      }
    },
    clickAddPostMod() {
      this.isDetailMod = false;
      this.isListMode = false;
      this.isCreateMode = true;
    },
    onPostClick(postId) {
      this.selectedPostID = postId;
      this.isDetailMode = true;
      this.isListMode = false;
      this.isCreateMode = false;
    },
    goBack() {
      this.isDetailMode = false;
      this.isListMode = true;
      this.isCreateMode = false;
      this.selectedPostID = null;
    },
    async deletePost(postId) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/board/info/${postId}`, {
          headers: {
            'Authorization': token
          }
        });
        this.fetchPosts();
      } catch (error) {
        console.error(error);
      }
    },
    async editPost() {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`/api/board/info/${this.selectedPostID}`, {
          title: this.title,
          content: this.content,
        }, {
          headers: {
            'Authorization': token
          }
        });
        this.fetchPosts();
        this.isEditMode = false;
        this.isListMode = true;
      } catch (error) {
        console.error(error);
      }
    },
    async clickEditPost(postId) {
      try {
        const response = await axios.get(`/api/board/info/${postId}`);
        this.title = response.data.title;
        this.content = response.data.content;

        this.selectedPostID = postId;
      this.isDetailMode = false;
      this.isListMode = false;
      this.isEditMode = true;
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
  margin-top: 20px;
  font-family: 'NanumSquareNeo';
}
    
.title-label {
  font-size: 27px; /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-left: 25px; /* 상대적인 단위로 변경 */
  margin-bottom: 5px ;
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