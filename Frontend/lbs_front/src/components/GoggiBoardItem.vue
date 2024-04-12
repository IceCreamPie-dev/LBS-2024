<template>
  <div @click="handleClick">
    <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
    <div class="card">
      <h5 class="card-title">{{ postId }}</h5>
      <p class="card-text">{{ title }}</p>
      <p class="text-muted">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script>
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
      this.$emit('click', this.postId);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  width: 100%;
  /* 카드 너비 조정 */
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: rgb(96, 85, 72, 0.6) 1.5px solid;
  font-family: 'NanumSquareNeo';
}

.card-title {
  font-size: 20px;
  font-weight: 900;
  color: #FFBB06;
  width: 70px;
  height: 45px;
  line-height: 2.5;
}

.card-text {
  font-size: 16px;
  font-weight: bold;
  width: 500px;
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
</style>