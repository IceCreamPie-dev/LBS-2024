<template>
  <header class="header">
    <CHeader />
  </header>
  <div class="yellow-line"></div>
  <div class="content">
    <aside class="side">
    </aside>
    <main class="main">
      <MyPage v-if="currentPage === 'MyPage'" /> 
      <QnaMonit v-if="currentPage === 'QnA'" /> 
      <GonggiMonit v-if="currentPage === 'Gonggi'" /> 
      <MainPage v-if="currentPage === 'NULL'" />
    </main>
    <nav class="nav">
      <SideBar />
    </nav>
  </div>
  <footer class="footer">
    <CFooter />
  </footer>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import CHeader from '../components/CHeader.vue';
import CFooter from '../components/CFooter.vue';
import MyPage from '../components/MyPageMonit.vue';
import QnaMonit from '../components/QnaMonit.vue'; //QnA
import GonggiMonit from '../components/gonggiMonit.vue'; //공지사항
import MainPage from '../components/MainPage.vue';

export default {
  components: {
    SideBar,
    CHeader,
    CFooter,
    MyPage,
    GonggiMonit,
    QnaMonit,
    MainPage
  },
  data() {
    return {
      name: '',
      studentId: '',
      email: '',
      password: '',
      confirmPassword: '',
      isNameValid: true,
      isStudentIdValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmPasswordValid: true,
      errorMessage: '',
      currentPage: 'NULL' // 동적 컴포넌트를 저장할 데이터
    };
  },
  created() {
    this.emitter.on('change-page', this.onChangePage);
  },
  unmounted() {
    this.emitter.off('change-page', this.onChangePage);
  },
  methods: {
    onChangePage(page) {
      this.currentPage = page;
      console.log(page);
    },
  }
};
</script>

<style>
.main-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px;
}

.content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-top: 10px;
  min-width: 300px;
}

.side {
  flex: 0 0 20%; 
}

.body {
  flex: 1; 
}

.menu {
  flex: 0 0 20%; 
}

.footer {
}

.yellow-line {
  height: 1.5px;
  background-color: rgba(255, 222, 128, 1);
}
</style>