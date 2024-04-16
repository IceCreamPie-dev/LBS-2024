<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="page-container">
    <header class="header"></header>
    <div class="signup-container">
      <div class="signup-form">
        <img src="../assets/logo.png" alt="logo" class="logo" />
        <div class="small-line"></div> 
        <form class="form-fields">

          <div class="form-group">
            <label for="name" class="form-label">이름</label>
            <input type="text" id="name" class="form-input" v-model="name" @input="validateName" />
            <span class="success-message" v-if="isNameValid && name"> ✔</span>
          </div>
          <div>
            <span class="error-message" v-if="!isNameValid && name"> ❌ 올바르지 않은 이름입니다.</span>
          </div>

          <div class="form-group">
            <label for="studentId" class="form-label">학번</label>
            <input type="text" id="studentId" class="form-input" v-model="studentId" @input="validateStudentId" />
            <span class="success-message" v-if="isStudentIdValid && studentId"> ✔</span>
          </div>
          <div>
            <span class="error-message" v-if="errorMessage"> &nbsp;❌ {{ errorMessage }}</span>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">이메일</label>
            <input type="email" id="email" class="form-input" v-model="email" @input="validateEmail" />
            <span class="success-message" v-if="isEmailValid && email"> ✔</span>
          </div>
          <div>
            <span class="error-message" v-if="!isEmailValid && email"> ❌ 이메일 형식이 맞지 않습니다.</span>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">비밀번호</label>
            <input type="password" id="password" class="form-input" v-model="password" @input="validatePassword" />
            <span class="success-message" v-if="isPasswordValid && password && confirmPassword"> ✔</span>
          </div>
          <div>
            <span class="error-message" v-if="!isPasswordValid && password && confirmPassword"> ❌ 비밀번호가 일치하지
              않습니다.</span>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">비밀번호 확인</label>
            <input type="password" id="confirmPassword" class="form-input" v-model="confirmPassword"
              @input="validateConfirmPassword" />
            <span class="success-message" v-if="isConfirmPasswordValid && confirmPassword"> ✔</span>
          </div>
          <div>
            <span class="error-message" v-if="!isConfirmPasswordValid && confirmPassword"> ❌ 비밀번호가 일치하지 않습니다.</span>
          </div>
          <button class="btn-register" @click="Register">회원가입</button>
        </form>
        <div class="small-line"></div> 
      </div>
    </div>
    
    <footer class="footer"></footer>
  </div>
</template>

<script>
import axios from 'axios';
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
    },
    async Register() {
      // 이름, 학번, 이메일, 비밀번호, 비밀번호 확인 필드가 유효한지 확인
      if (!this.isNameValid || !this.isStudentIdValid || !this.isEmailValid || !this.isPasswordValid || !this.isConfirmPasswordValid) {
        return;
      }
      // 회원가입 요청
      try {
        const response = await axios.post(`/api/register`, {
          name: this.name,
          studentId: this.studentId,
          email: this.email,
          pwd: this.password,
          type: 0
        });
        // 회원가입 성공 시
        // 1초 뒤에 메인 페이지로 이동
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          this.$router.replace('/');
        }, 1000);
      } catch (error) {
        // 회원가입 실패 시
        if (error.response.status === 409) {
          alert('이미 존재하는 이메일입니다.');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      }
    },
  }
};
</script>

<style scoped>

@media screen and (max-width: 1500px) {

.error-message,
.success-message {
  display: none;
}

.header {
background-color: #FFDE80;
padding: 40px;
text-align: center;
width: 100%;
position: fixed;
top: 0;
left: 0;
}

.footer {
background-color: #FFDE80;
color: #fff;
padding: 40px;
text-align: center;
width: 100%;
position: fixed;
bottom: 0;
left: 0;
}
.small-line{
  border: #ffde80 2px solid;
}
.signup-container {
display: flex;
align-items: center;
justify-content: center;
color: #aeaeae;
padding: 40px 30px;

}

.signup-form {
display: flex;
flex-direction: column;
margin-top: 50px;
width: 100%;
max-width: 600px;
}

.logo {
width: 280px;
margin-top: 5px;
margin-bottom: 20px;
margin-left: 50px;
max-width: 100%;
align-self: center;
}

.form-fields {  
border: 1px solid rgba(217, 217, 217, 1);
border-radius: 10px;
margin-bottom: 20px;
margin-top: 20px; /* 픽셀(px) 단위로 변경 */
margin-left: px; /* 픽셀(px) 단위로 변경 */
padding: 40px 40px; /* 픽셀(px) 단위로 변경 */
display: flex;
flex-direction: column;
align-items: center;
}

.form-group {
display: flex;
height: 45px;
font-size: 18px; /* 픽셀(px) 단위로 변경 */
margin: 13px; /* 픽셀(px) 단위로 변경 */
margin-right: 20px;
font-family: 'NanumSquareNeo';

}

.form-label {
text-align: center;
height: 25px;
margin-top: 15px; /* 픽셀(px) 단위로 변경 */
width: 130px; /* 픽셀(px) 단위로 변경 */
margin-right: 30px;

}

.form-input {
width: 260px; 
height: 40px;
border-radius: 6px;
border: 1px solid rgba(217, 217, 217, 1);
margin-bottom: 15px; /* 픽셀(px) 단위로 변경 */
}

.btn-register {
border-radius: 9px;
border: none;
background-color: #ffde80;
width: 85%; /* 픽셀(px) 단위로 변경 */
max-width: 100%;
font-size: 21px; /* 픽셀(px) 단위로 변경 */
font-weight: bold;
color: #484848;
margin-top: 30px; /* 픽셀(px) 단위로 변경 */
padding: 13px; /* 픽셀(px) 단위로 변경 */
cursor: pointer;
position: relative;
font-family: 'NanumSquareNeo';
}

.btn-register:hover {
background-color: #ffd56c;
color: rgb(56, 39, 0);
font-weight: bold;
}

.btn-register {
display: inline-flex;
align-items: center;
justify-content: center;
font-family: 'NanumSquareNeo';
}

.error-message {
display: inline-block;
text-align:left ;
color: #FA5C87;
margin-left: 165px;
font-size: 14px; /* 픽셀(px) 단위로 변경 */
width: 280px;
}

.success-message {
color: #00D26A;
}
}

@media screen and (min-width: 1500px) {

.error-message,
.success-message {
display: none;
}

.header {
background-color: #FFDE80;
padding: 40px;
text-align: center;
width: 100%;
position: fixed;
top: 0;
left: 0;
}

.footer {
background-color: #FFDE80;
color: #fff;
padding: 40px;
text-align: center;
width: 100%;
position: fixed;
bottom: 0;
left: 0;
}
.small-line{
  border: #ffde80 2px solid;
}
.signup-container {
display: flex;
align-items: center;
justify-content: center;
color: #aeaeae;
padding: 40px 30px;

}

.signup-form {
display: flex;
flex-direction: column;
margin-top: 50px;
width: 100%;
max-width: 600px;
}

.logo {
width: 280px;
margin-top: 5px;
margin-bottom: 20px;
margin-left: 50px;
max-width: 100%;
align-self: center;
}

.form-fields {  
border: 1px solid rgba(217, 217, 217, 1);
border-radius: 10px;
margin-bottom: 20px;
margin-top: 20px; /* 픽셀(px) 단위로 변경 */
margin-left: px; /* 픽셀(px) 단위로 변경 */
padding: 40px 40px; /* 픽셀(px) 단위로 변경 */
display: flex;
flex-direction: column;
align-items: center;
}

.form-group {
display: flex;
height: 45px;
font-size: 18px; /* 픽셀(px) 단위로 변경 */
margin: 13px; /* 픽셀(px) 단위로 변경 */
margin-right: 20px;
font-family: 'NanumSquareNeo';

}

.form-label {
text-align: center;
height: 25px;
margin-top: 15px; /* 픽셀(px) 단위로 변경 */
width: 130px; /* 픽셀(px) 단위로 변경 */
margin-right: 30px;

}

.form-input {
width: 260px; 
height: 40px;
border-radius: 6px;
border: 1px solid rgba(217, 217, 217, 1);
margin-bottom: 15px; /* 픽셀(px) 단위로 변경 */
}

.btn-register {
border-radius: 9px;
border: none;
background-color: #ffde80;
width: 85%; /* 픽셀(px) 단위로 변경 */
max-width: 100%;
font-size: 21px; /* 픽셀(px) 단위로 변경 */
font-weight: bold;
color: #484848;
margin-top: 30px; /* 픽셀(px) 단위로 변경 */

padding: 13px; /* 픽셀(px) 단위로 변경 */
cursor: pointer;
position: relative;
}

.btn-register:hover {
background-color: #ffd56c;
color: rgb(56, 39, 0);
font-weight: bold;
}

.btn-register {
display: inline-flex;
align-items: center;
justify-content: center;
font-family: 'NanumSquareNeo';
}

.error-message {
display: inline-block;
text-align:left ;
color: #FA5C87;
margin-left: 165px;
font-size: 14px; /* 픽셀(px) 단위로 변경 */
width: 280px;
}

.success-message {
color: #00D26A;
}
}



.form-fields{
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

.btn-register{
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.btn-register:hover{
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
} 

</style>