<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="home-account">
    <header class="header"></header>
    <img src="../assets/logo.png" alt="Vue logo" class="logo" />
    <div class="small-line"></div> 
    <main class="home-form">
      <form @submit.prevent="Login">
        <div class="form-group">
          <label for="email" class="form-label">이메일</label>
          <input v-model="email" type="text" placeholder="email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">비밀번호</label>
          <input v-model="password" type="password" placeholder="Password" class="form-input" />
        </div>
        <div class="form-actions">
          <button class="btn-inner" type="submit">로그인</button>
          <router-link to="/register" class="btn btn-signup">
            <button class="btn-inner">회원가입</button>
          </router-link>
                
        </div>
      </form>
    </main>
    <div class="small-line"></div> 
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('token')) {
      next('/');
    } else {
      next();
    }
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  start() {
    this.$store.dispatch('checkLogin');
  },
  methods: {
    // 로그인 버튼 클릭 시 호출되는 함수 vuex를 이용하여 로그인 처리
    async Login() {
      if (!this.email || !this.password) {
        alert('이메일과 비밀번호를 입력하세요.');
        return;
      }

      if (!this.email.includes('@')) {
        alert('유효한 이메일을 입력하세요.');
        return;
      }

      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('로그인에 실패했습니다. 다시 시도하세요.');
      }
    }
  }
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
  top: 140px;
  /* header의 높이만큼 아래에 위치 */
  bottom: 101px;
  /* footer의 높이만큼 위에 위치 */
  width: 100%;
  overflow-y: auto;
  font-family: 'NanumSquareNeo';
  /* 내용이 넘칠 경우 스크롤 표시 */
}

.header {
  background-color: rgba(255, 187, 6, 0.5);
  min-height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.footer {
  background-color: rgba(255, 187, 6, 0.5);
  min-height: 60px;
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
  margin-left: 40px;
  width:20%;
  height: 20%;
  max-width: 100%;
}

.small-line{
  border: #ffde80 2px solid;
  width: 500px;
  margin: 0 auto;
}

.home-form {
  border: 1px solid rgba(217, 217, 217, 1);
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 430px;
  max-width: 100%;
  padding: 50px 35px;
  border-radius: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  
}

.home-form:hover{
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  gap: 30px;
  margin-top: 18px;



}

.form-label {
  font-style: normal;
  flex-grow: 1;
  text-align: center;
  font-size: 17px;
  margin: 1px;
  margin-top: 12px;
  


}

.form-input {
  border-radius: 5px;
  border: 1px solid rgba(225, 225, 225, 1);
  width: 285px;
  max-width: 100%;
  margin-right: 20px;
  height: 40px;

}

.form-actions {
  display: flex;
  justify-content: flex-end;
  /* 버튼을 오른쪽으로 정렬합니다. */
  gap: 12px;
  /* 버튼 사이의 간격 조정 */
  color: #848484;
  margin: 18px 0 35px;
  margin-right: 20px;
}

.btn,
.btn-inner {
  border-radius: 5px;
  padding: 0;
  background-color: #FFBB06;
  /* 호버 상태에서 배경색 변경 */
  color: rgb(255, 255, 255);
  width: 140px;
  height: 50px;
  font-size: 17px;
  font-family: sans-serif;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  font-family: 'NanumSquareNeo';
  
  /* 배경색 변화에 애니메이션 효과 추가 */
}

.btn:hover,
.btn-inner:hover {
  background-color: #ff8000;
  color: rgb(255, 255, 255);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  font-weight: initial;
}

.btn,
.btn-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>