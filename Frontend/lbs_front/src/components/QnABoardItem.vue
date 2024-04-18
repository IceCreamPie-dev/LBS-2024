<template>
  <div>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="card">
      <h5 class="card-title" @click="handleClick">{{ postId }}</h5>
      <p class="card-text" @click="handleClick">{{ title }}</p>
      <p class="text-muted" @click="handleClick">{{ formattedDate }}</p>
    <button v-if="email === currentUserEmail || role" @click="clickEditPost(postId)" class="action-button"><img src="@/assets/submit.svg" alt="수정"></button>      
    <button v-if="email === currentUserEmail || role" @click="deletePost(postId)" class="action-button"><img src="@/assets/delete.svg" alt="삭제"></button>      
    </div>
    </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: [String, Date, Number],
    },
    email: {
      type: String,
      required: true,
    },
  },
  Data() {
    return {
      formattedDate: '',
      currentUserEmail: '',
      role: 0,
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogin = true;
      const decoded = jwtDecode(token);
      this.currentUserEmail = decoded.email;
      this.role = decoded.role.toString() === '1' ? true : false;
    }
  },
  computed: {
    formattedDate() {
      const created_at = new Date(this.createdAt);
      const year = created_at.getFullYear();
      const month = String(created_at.getMonth() + 1).padStart(2, '0');
      const day = String(created_at.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  },
  methods: {
    handleClick() {
      this.$emit('onPostClick', this.postId);
    },
    deletePost() {
      this.$emit('deletePost', this.postId);
    },
    clickEditPost() {
      this.$emit('clickEditPost', this.postId);
    },
  },
};
</script>


<style scoped>

@media screen and (max-width: 1500px) {
  .card {
  background-color: #ffffff;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: rgb(96, 85, 72, 0.6) 1.5px solid;
  font-family: 'NanumSquareNeo';
}

.card-title {
  
  font-size: 20px;
  font-weight: 600;
  color: #FFBB06;
  width: 70px;
  height: 5%px;
  line-height: 2.5;
}

.card-text {
  
  font-size: 16px;
  font-weight: bold;
  width: 75%;
  height: 5%;
  color: #605548;
  line-height: 3;
  cursor: pointer;
}

.text-muted {
  
  color: #605548;
  font-size: 14px;
  width: 120px;
  height: 5%;
  line-height: 3.3;
}
}

@media screen and (min-width: 1500px) {
  .card {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: rgb(96, 85, 72, 0.6) 1.5px solid;
  font-family: 'NanumSquareNeo';
}

.card-title {
  
  font-size: 20px;
  font-weight: 600;
  color: #FFBB06;
  width: 100px;
  height: 45px;
  line-height: 2.5;
}

.card-text {
  
  font-size: 16px;
  font-weight: bold;
  width: 75%;
  height: 45px;
  color: #605548;
  line-height: 3;
  cursor: pointer;
}

.text-muted {
  
  color: #605548;
  font-size: 14px;
  width: 120px;
  height: 45px;
  line-height: 3.3;
}
}

.action-button{
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
}

.action-button:hover{
  transition: box-shadow 0.3s ease; /* 그림자 애니메이션 적용 */
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
}


.action-button img{
  width: 95%;
  
}

.card-text:hover{
  color: #FFBB06;
  font-size: 17px;

}
</style>