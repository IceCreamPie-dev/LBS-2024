<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="title-group">
    <label for="title" class="title-label">공지사항</label>
  </div>
  <div class="yellow-line"></div>
  <div v-if=isListMode>
    <div v-if=role class="post-add-button-container"> <!-- 관리자 게시물 생성 기능이 보임 왼쪼 정렬-->
      <button class="post-add-button" @click="clickAddPostMod">게시물 생성</button>
    </div>
    <div v-for="post in post" :key="post.iid">
      <GoggiBoardItem :post-id="post.iid" :title="post.title" :createdAt="post.created_at" :content="post.content"
        :role="role" @onPostClick="onPostClick" @deletePost="deletePost" @clickEditPost="clickEditPost" />
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">다음</button>
    </div>
  </div>
  <div v-else-if=isDetailMode>
    <GoggiPostDetail :post-id="selectedPostID" @goBack="goBack" />
  </div>
  <div v-else-if=isCreateMode>
    <form @submit.prevent="submitPost">
      <div class="container">
      <div class="form-group">
        <label for="title" class="title-label_post">제목</label>
        <input type="text" id="title" v-model="title" class="form-control" placeholder="제목을 입력하세요">
      </div>
      <div class="form-group2">
        <label for="content" class="content-label">내용</label>
        <textarea id="content" v-model="content" class="form-control" rows="15" placeholder="내용을 입력하세요"></textarea>
      </div>
      <div class="button-group">
      <button type="submit" class="btn-primary" @click="createPost">등록</button>
      <button type="button" class="btn-secondary" @click="goBack">취소</button>
    </div>
    </div>
    </form>
    
  </div>
  <div v-else-if=isEditMode>
    <form @submit.prevent="submitPost">
       <div class="container">
          <div class="form-group">
            <label for="title" class="title-label_post">제목</label>
            <input type="text" id="title" v-model="title" class="form-control" placeholder="제목을 입력하세요">
          </div>
          <div class="form-group2">
            <label for="content" class="content-label">내용</label>
            <textarea id="content" v-model="content" rows="15" required class="form-control"
              placeholder="내용을 입력하세요"></textarea>
          </div>
          <div class="button-group">
            <button type="submit" class="btn-primary" @click="editPost">수정</button>
            <button type="button" class="btn-secondary" @click="goBack">취소</button>
          </div>
        </div>
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
  font-size: 27px;
  /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-left: 25px;
  /* 상대적인 단위로 변경 */
  margin-bottom: 5px;
}



.post-add-button-container {
  text-align: right;
  /* 내부 요소를 오른쪽으로 정렬합니다. */

}

.post-add-button {
  /* 게시물 생성 버튼 */
  background-color: #FFDE80;
  color: #484848;
  border: none;
  border-radius: 3px;
  margin-top: 1%;
  margin-right: 3%;
  padding: 10px;
  cursor: pointer;
  font-family: 'NanumSquareNeobold';
  font-size: 17px;
  display: inline-block;
  transition: box-shadow 0.3s ease;
  /* 버튼을 블록 요소로 표시하여 왼쪽 정렬을 위해 줄 바꿈됩니다. */
  /* 왼쪽 여백을 0으로 설정하여 왼쪽 정렬합니다. */
}

.post-add-button:hover {
  background-color: #ffd358;
  color: #484848;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);

}

/*------------------------------------------------------------------------------------------ */
.container {
  margin: 0 auto; 
  margin-top: 4%;
  width: 92%;
  height: 90%;
  color: #605548;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  font-family: 'NanumSquareNeo';

}

.post-form {
  margin: 0 auto;
  margin: 2%;
  width: 92%;
  height: 90%;
  background-color: #ffffff;
  color: #605548;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  font-family: 'NanumSquareNeo';
}

.form-group {
  border-radius: 50px;
  padding: 1.5%;
  padding-bottom: 3%;
}

.form-group2 {
  margin-top: 15px;
  margin-bottom: 30px;
}

.title-label_post {
  display: inline-block;
  font-size: 17px;
  font-family: 'NanumSquareNeobold';
  margin-right: 2%;
  margin-left: 0.7%;
  text-align: center;
  border-bottom: #FFDE80 3px solid;
  padding: 1.3%;
  width: 5%;
}

.content-label {
  display: inline-block;
  font-size: 17px;
  font-family: 'NanumSquareNeobold';
  margin-left: 2%;
  text-align: center;
  width: 5%;
  padding: 1.2%;
  margin-bottom: 1.5%;
  border-bottom: #FFDE80 3px solid;

}

input[type="text"] {
  width: 80%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  resize: vertical;
}

textarea {
  margin-left: 1%;
  width: 93%;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  resize: vertical;
}

.button-group {
  text-align: center;
  font-family: 'NanumSquareNeo';

}

.btn-primary,
.btn-secondary {
  font-family: 'NanumSquareNeoExtraBold';
  font-size: 16px;
  width: 12%;
  padding: 1.5%;
  margin: 0 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #FFDE80;
  color: #605548;
  transition: box-shadow 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
}

.btn-secondary {
  background-color: rgb(96, 85, 72, 0.8);
  color: #ffffff;
  transition: box-shadow 0.3s ease;
}

.btn-secondary:hover {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
}
/*---------------------------------------------------------------------------------------------------------------*/
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5%; 
}

/*관리자 모드일때 margin 조정이필요 ㅜ 
@media  screen and (min-width: 1500px){
  .pagination {
    margin-left: -7%;
  }
}
*/

@media screen and (max-width: 1500px) {
  .pagination {
    margin-left: -15%;
  }
}
.pagination button {
  background-color: #605548; 
  color: #fff; 
  border: none; 
  border-radius: 5px; 
  padding: 1.1% 1.9%; 
  margin: 0 5px; 
  cursor: pointer; 
  font-size: 14px; 
  transition: box-shadow 0.3s ease;
  font-family: 'NanumSquareNeo';
}
.pagination button:hover{
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
}
.pagination button:disabled {
  opacity: 0.5; /* 비활성 상태일 때 투명도 조절 */
  cursor: not-allowed; /* 비활성 상태일 때 포인터 커서 변경 */
}

.pagination span {
  margin: 0 5%; 
  font-size: 16px;
  color: #333; 
  font-family: 'NanumSquareNeo';
}

</style>