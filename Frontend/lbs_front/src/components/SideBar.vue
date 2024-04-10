<template>
  <div class="main-container">
    <div class="signup-container">
      <div class="signup-form">
      </div>
    </div>
    <div class="menu-container">
      <div class="user-profile" v-if="isLogin">
        <div class="profile-image">
          <a href="#"><img src="../assets/user.png" alt="사용자 이미지"></a>
        </div>
        <div class="profile-details">
          <div class="user-info">
            <label class="username">{{ username }}</label>
            <label for="no">|</label>
            <label class="role">{{ role }}</label>
          </div>
          <div class="user-email">{{ email }}</div>
          <button class="logout-button" @click="Logout">로그아웃</button>
        </div>
      </div>
      <div class="user-profile" v-else>
        <router-link to="/login" class="login-button">
          <img class="test" src="../assets/doumi-login.png" alt="사용자 이미지">
        </router-link>
      </div>
      <ul class="menu-list">
        <li><a herf="#" @click="changePage('NULL')">졸업계산기</a></li>
        <li><a href="#" @click="changePage('Gonggi')">공지사항</a></li>
        <li v-if="isLogin"><a href="#" @click="changePage('MyPage')">마이페이지</a></li>
        <li><a href="#" @click="changePage('QnA')">Q&A 게시판</a></li>
      </ul>
      <div class="guid">
        <ul class="guid-menu">
          <li>
            <img src="../assets/guid.png" alt="졸업알리미 사용설명서" @click="toggleModal" class="loading-icon">
            <div class="guid-modal" v-if="showModal"><img src="../assets/doumi-guid.png" alt="도우미 가이드"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      showModal: false,
      isLogin: false,
      username: '',
      email: '',
      role: ''
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogin = true;
      const decoded = jwtDecode(token);
      this.username = decoded.name;
      this.email = decoded.email;
      this.role = decoded.role.toString() === '1' ? '관리자' : '유저';
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    changePage(page) {
      this.emitter.emit('change-page', page);
    },
    async Logout() {
      await this.$store.dispatch('logout');
      this.isLogin = false;
      this.username = '';
      this.email = '';
      this.role = '';
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
@import url('@/styles/SideBar.css');
.test {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>