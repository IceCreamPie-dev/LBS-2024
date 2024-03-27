<template>
  <div class="page-container">
    <header class="header"></header>
    <div class="signup-container">
      <div class="signup-form">
    
        <form class="form-fields">
          <div class="form-group">
            <label for="name" class="form-label">이름</label>
            <input type="text" id="name" class="form-input" v-model="name" @input="validateName" />
            <span class="error-message" v-if="!isNameValid && name"> ❌ 올바르지 않은 이름입니다.</span>
            <span class="success-message" v-if="isNameValid && name"> ✔</span>
          </div>
          <div class="form-group">
            <label for="studentId" class="form-label">학번</label>
            <input type="text" id="studentId" class="form-input" v-model="studentId" @input="validateStudentId" />
            <span class="error-message" v-if="!isStudentIdValid && studentId && studentId.length > 10"> ❌ {{  errorMessage }}</span>
            <span class="success-message" v-if="isStudentIdValid && studentId"> ✔</span>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">이메일</label>
            <input type="email" id="email" class="form-input" v-model="email" @input="validateEmail" />
            <span class="error-message" v-if="!isEmailValid && email"> ❌ 이메일 형식이 맞지 않습니다.</span>
            <span class="success-message" v-if="isEmailValid && email"> ✔ </span>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">비밀번호</label>
            <input type="password" id="password" class="form-input" v-model="password" @input="validatePassword" />
            <span class="error-message" v-if="!isPasswordValid && password && confirmPassword"> ❌ 비밀번호가 일치하지 않습니다.</span>
            <span class="success-message" v-if="isPasswordValid && password && confirmPassword"> ✔ 비밀번호가 일치합니다.</span>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">비밀번호 확인</label>
            <input type="password" id="confirmPassword" class="form-input" v-model="confirmPassword" @input="validateConfirmPassword" />
            <span class="error-message" v-if="!isConfirmPasswordValid && confirmPassword"> ❌ 비밀번호가 일치하지 않습니다.</span>
            <span class="success-message" v-if="isConfirmPasswordValid && password && confirmPassword"> ✔ 비밀번호가 일치합니다.</span>
          </div>
          <button type="submit" class="signup-button">회원가입</button>
        </form>
      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
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
      errorMessage:''
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
      // 학번이 비어 있는지 확인
      if (this.studentId.trim() === '') {
        this.isStudentIdValid = true; // 비어 있으면 유효
        return;
      }
      // 학번에 이상한 문자가 있는지 확인
      const studentIdPattern = /^[0-9]+$/;
      this.isStudentIdValid = studentIdPattern.test(this.studentId);

      // 학번이 11자리 이상일때 오류 메시지 설정해두기
      if(this.studentId.length > 10)  {
        this.errorMessage = '학번은 10자리까지 입력가능합니다';
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

<style scoped>
.error-message, .success-message {
  display: none;
}

.header, .footer {
  background-color: #FFDE80; /* 원하는 배경색 지정 */
  color: #fff;
  padding: 20px;
  text-align: center;
}

.signup-container {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aeaeae;
  padding: 4vw 3vw; /* 상대적인 단위로 변경 */
}


.signup-form {
  display: flex;
  flex-direction: column;
  width: 100%; /* 화면 크기에 관계없이 부모 요소에 따라 동적으로 조절 */
  max-width: 800px; /* 최대 너비 설정 */
  margin-right: 6vw; /* 상대적인 단위로 변경 */
}


.logo {
  width: 384px;
  margin-left: 70px;
  max-width: 100%;
  align-self: center;
}

.form-fields {
  border: 1px solid rgba(217, 217, 217, 1);
  margin-top: 2vw;
  margin-left: 1vw;
  padding: 4vw 6vw; /* 상대적인 단위로 변경 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  font-size: 1.5vw; /* 상대적인 단위로 변경 */
  margin-left: 0;
  margin: 5px;
  width: 90%; /* 부모 요소인 form-fields에 따라 동적으로 조절 */
}

.form-label {
  text-align: center;
  margin-top: 10px;
  width: 40%; /* 상대적인 단위로 변경 */
}

.form-input {
  width: 60%; /* 상대적인 단위로 변경 */
  height: 41px;
  border-radius: 6px;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-bottom: 15px;
}

.signup-button {
  border-radius: 9px;
  border: none;
  background-color: #ffde80;
  width: 60%; /* 상대적인 단위로 변경 */
  max-width: 100%;
  font-size: 1.5vw; /* 상대적인 단위로 변경 */
  font-weight: bold;
  color: #484848;
  margin-top: 3vw; /* 상대적인 단위로 변경 */
  margin-right: 1vw; /* 상대적인 단위로 변경 */
  padding: 3vw; /* 상대적인 단위로 변경 */
  cursor: pointer;
}
.signup-button:hover {
  background-color: #ffd56c;
  color: rgb(56, 39, 0);
  font-weight: bold;
}

.error-message {
  color: #FA5C87;
  margin-left: 1vw; /* 상대적인 단위로 변경 */
  margin-top: 1.3vw; /* 상대적인 단위로 변경 */
  display: block;
  font-size: 1.3vw; /* 상대적인 단위로 변경 */
  font-weight: 400; /* 올바른 값으로 변경 */
}
.success-message {
  color: #00D26A;
  margin-left: 1vw; /* 상대적인 단위로 변경 */
  margin-top: 1.3vw; /* 상대적인 단위로 변경 */
  display: block;
  font-size: 1.3vw; /* 상대적인 단위로 변경 */
  font-weight: 400; /* 올바른 값으로 변경 */
}

@media screen and (max-width: 768px) {
  .signup-form {
    width: 90%; /* 화면이 작을 때는 전체 너비의 90%를 차지하도록 설정 */
    margin-right: 0; /* 오른쪽 여백을 제거하여 너비를 조정 */
  }

  .form-label {
    width: 40%; /* 레이블의 너비를 확장 */
  }

  .form-input {
    width: 60%; /* 입력 필드의 너비를 축소 */
  }
}
</style>