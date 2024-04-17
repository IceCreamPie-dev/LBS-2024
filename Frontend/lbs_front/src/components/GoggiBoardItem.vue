<template>
  <div>
    <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
    <div class="card" @click="handleClick">
      <h5 class="card-title">{{ postId }}</h5>
      <p class="card-text">{{ title }}</p>
      <p class="text-muted">{{ formattedDate }}</p>
      <button @click="deletePost(postId)">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
  },
  Data() {
    return {
      formattedDate: '',
    };
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
    async deletePost(postId) {
      try {
        await axios.delete(`/api/board/QnA/${postId}`);
        this.$emit('delete', postId);
      } catch (error) {
        console.error(error);
      }
    }
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

</style>