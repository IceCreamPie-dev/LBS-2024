<template>
    <div>
        <div class="title-group">
            <label for="title" class="title-label">Q&A 게시판</label>
        </div>
        <div class="yellow-line"></div>
        <div v-for="post in posts" :key="post.id">
            <BoardItem :post-id="post.qid" :title="post.title" :created-at="post.createdAt" :content="post.content"></BoardItem>
        </div>
    </div>
</template>

<script>
import BoardItem from '@/components/QnABoardItem.vue';
import axios from 'axios';

export default {
    components: {
        BoardItem,
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