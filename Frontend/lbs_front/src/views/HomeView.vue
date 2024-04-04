<template>
  <header class="header">
    <CHeader />
  </header>
  <div class="yellow-line"></div>
  <div class="content">
    <aside class="side">
    </aside>
    <main class="main">
      <MyPage />
    </main>
    <nav class="nav">
      <sideBar />
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
/*
import axios from 'axios';
import { API_URL } from './config.js'; // config.js 파일 경로 수정
*/
export default {
  components: {
    SideBar,
    MyPage,
    CHeader,
    CFooter
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
      errorMessage: ''
    };
  },
  methods: {
    /*async login() {
      try {
        const response = await axios.post(`${API_URL}/login`, {
          username: this.name,
          password: this.password
        });
      } catch (error) {
        console.error(error);
      }
    },*/
    validateName() {
      // 이름이 비어 있는지 확인
      if (this.name.trim() === '') {
        this.isNameValid = true; // 비어 있으면 유효
        return;
      }
      // 이름에 한글만 있는지 확인
      const koreanPattern = /^[가-힣]+$/;
      this.isNameValid = koreanPattern.test(this.name);
    },
    validateStudentId() {
      const studentIdPattern = /^[0-9]{10}$/;
      this.isStudentIdValid = studentIdPattern.test(this.studentId);

      if (!this.isStudentIdValid && this.studentId.length > 0) {
        this.errorMessage = '학번은 10자리이며, 숫자여야 합니다.';
      } else {
        this.errorMessage = '';
      }
    },
    validateEmail() {
      // 이메일이 비어 있는지 확인
      if (this.email.trim() === '') {
        this.isEmailValid = true; // 비어 있으면 유효
        return;
      }
      // 이메일 형식을 정규표현식으로 검증
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailPattern.test(this.email);
    },
    validatePassword() {
      // 비밀번호가 일치하는지 확인
      this.isPasswordValid = this.confirmPassword === '' || this.password === this.confirmPassword;
      this.isConfirmPasswordValid = this.isPasswordValid;
    },
    validateConfirmPassword() {
      // 비밀번호가 일치하는지 확인
      this.isConfirmPasswordValid = this.password === this.confirmPassword;
    }
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