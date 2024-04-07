<template>
    <div class="main-container">
      <div class="signup-container">
        <div class="signup-form">
        </div>
      </div>
      <div class="menu-container">
          <div class="Non-member-login">
              <img src="@/assets/doumi-login.png" alt="도우미 로그인">
        </div>
        <ul class="menu-list">
          <li><a href="#">공지사항</a></li>
          <li><a href="#">마이페이지</a></li>
          <li><a href="#">Q&A 게시판</a></li>
        </ul>
        <div class="guid">
          <ul class="guid-menu">
          <li>
            <img src="@/assets/guid.png" alt="졸업알리미 사용설명서" @click="toggleModal" class="loading-icon">
            <div class="guid-modal" v-if="showModal"><img src="@/assets/doumi-guid.png" alt="도우미 가이드"></div>
          </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>


<style scoped>
@import url('@/conponents/styles/MainSidebar.css');
</style>