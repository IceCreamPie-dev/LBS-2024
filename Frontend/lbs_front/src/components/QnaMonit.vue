<template>
    <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
    <div>
        <div class="title-group">
            <label for="title" class="title-label">Q&A 게시판</label>
        </div>
        <div class="yellow-line"></div>
        <form @submit.prevent="createPost">
      <input type="text" v-model="newPost.title" placeholder="제목">
      <textarea v-model="newPost.content" placeholder="내용"></textarea>
      <button type="submit">포스트 생성</button>
    </form>
        <div v-for="post in posts" :key="post.id">
            <QnABoardItem :post-id="post.qid" :title="post.title" :createdAt="post.created_at" :content="post.content"></QnABoardItem>
            <router-link :to="'/qna/' + post.id">{{  post.title }}</router-link>
        </div>
    </div>
</template>

<script>

import QnABoardItem from '@/components/QnABoardItem.vue';

import axios from 'axios';

export default {
    components: {
        QnABoardItem,
    },
    data() {
        return {
            posts: [],
            newPost: {
                title: '',
                content: ''
            }
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('/api/board/QnA', this.newPost);
                this.posts.push(response.data);
                this.newPost = {title: '', content: ''};
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
</style>