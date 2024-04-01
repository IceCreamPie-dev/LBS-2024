<template>
    <div class="home-account">
      <header class="header"></header>
      <img src="../assets/logo.png" alt="Vue logo" class="logo"/>
      <main class="home-form">
        <form>
          <div class="form-group">
            <label for="email" class="form-label">이메일</label>
            <input type="email" id="email" class="form-input" />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">비밀번호</label>
            <input type="password" id="password" class="form-input" />
          </div>
          <div class="form-actions">
      <router-link to="/register" class="btn btn-signup">
      <button class="btn-inner">회원가입</button>
      </router-link>
      <router-link to="/mypage" class="btn btn-login">
      <button class="btn-inner">로그인</button>
      </router-link>
  
          </div>
        </form>
      </main>
      <footer class="footer"></footer>
    </div>
  </template>
  
  <script>
  /*
  import axios from 'axios';
  import { API_URL } from './config.js';*/
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    }/*,
    methods:{
      // 로그인 요청을 보내는 메서드
      login(){
        // 로그인 요청을 보냄 name, password를 body에 담아서
        axios.post(`${API_URL}/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          // 응답으로 받은 토큰을 localStorage에 저장
          const token = response.data.accessToken;
          localStorage.setItem('token', token);
          // 로그인 성공 시 / 페이지로 이동
          if(response.status === 200){
            this.$router.push('/about');
          } else if (response.status === 400){
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    }*/
  }
  </script>
  
  <style scoped>
  
  .home-account {
    background-color: rgba(255, 255, 255, 0.98);
    display: flex;
    flex-direction: column;
    font-size: 20px;
    color: #b7b7b7;
    font-weight: 100;
    position: fixed;
    top: 101px; /* header의 높이만큼 아래에 위치 */
    bottom: 101px; /* footer의 높이만큼 위에 위치 */
    width: 100%;
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
  }
  
  .header {
    background-color: rgba(255, 187, 6, 0.5);
    min-height: 101px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .footer {
    background-color: rgba(255, 187, 6, 0.5);
    min-height: 101px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  
  .logo {
    aspect-ratio: 3.33;
    object-fit: auto;
    object-position: center;
    align-self: center;
    margin-top: 25px;
    margin-bottom: 20px;
    margin-left: 40px;
    max-width: 100%;
  }
  
  .home-form {
    border: 1px solid rgba(217, 217, 217, 1);
    align-self: center;
    margin-top: 5px;
    width: 430px;
    max-width: 100%;
    padding: 50px 35px;
    border-radius: 5px;
  }
  
  .form-group {
    display: flex;
    gap: 20px;
    margin-top: 18px;
  }
  
  .form-label {
    font-style: normal;
    flex-grow: 1;
    text-align: center;
    font-size: 17px;
    margin: 1px;
   
  
  }
  
  .form-input {
    border-radius: 5px;
    border: 1px solid rgba(225, 225, 225, 1);
    width: 280px;
    max-width: 100%;
    margin-right: 22px;
    height: 40px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽으로 정렬합니다. */
    gap: 10px; /* 버튼 사이의 간격 조정 */
    color: #848484;
    margin: 18px 0 35px;
    margin-right:20px ;
  }
  
  .btn, .btn-inner {
    border-radius: 5px;
    padding: 0;
    background-color: #ff9d00; /* 호버 상태에서 배경색 변경 */
    color: rgb(255, 255, 255);
    width: 140px;
    height: 50px;
    font-size: 17px;
    font-family: sans-serif;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 배경색 변화에 애니메이션 효과 추가 */
  }
  
  .btn:hover, .btn-inner:hover {
    background-color: #ff8000;
    color: rgb(255, 255, 255);
    font-weight:initial;
  }
  
  .btn-signup,
  .btn-login {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  </style>