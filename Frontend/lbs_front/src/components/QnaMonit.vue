<template>
    <div>
        <div class="title-group">
            <label for="title" class="title-label">Q&A 게시판</label>
        </div>
        <div class="yellow-line"></div>
        <div>
            <QnAPostDetail />
        </div>
        <div v-for="post in posts" :key="post.id">
            <QnABoardItem :post-id="post.qid" :title="post.title" :created-at="post.createdAt" :content="post.content"></QnABoardItem>
        </div>
    </div>
</template>

<script>

import QnABoardItem from '@/components/QnABoardItem.vue';
import QnAPostDetail from '@/components/QnABoardItem.vue';


import axios from 'axios';

export default {
    components: {
        QnABoardItem,
        QnAPostDetail,
    },
    data() {
        return {
            posts: [],
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('/api/board/QnA');
                this.posts = response.data;
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
}

.title-label {
  font-size: 2vw; /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-left: 1vw; /* 상대적인 단위로 변경 */
}
</style>
