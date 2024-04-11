<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class = "title-group">
    <label for="title" class="title-label">공지사항</label>
  </div> 
  <div class="yellow-line"></div>
  <div>
    <GoggiBoardItem/>
  </div>
</template>
<script>

import GoggiBoardItem from '@/components/GoggiBoardItem.vue';
export default {
    components: {
      GoggiBoardItem,
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