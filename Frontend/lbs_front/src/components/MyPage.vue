<template>
  <div class = "title-group">
    <label for="title" class="title-label">마이페이지</label>
  </div> 
  <div class="yellow-line"></div>
<form class = "form-page">
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
<span class="error-message" v-if="errorMessage"> ❌ {{ errorMessage }}</span>
 </div>

<div class="form-group">
  <label for="email" class="form-label">이메일</label>
  <input type="email" id="email" class="form-input" v-model="email" @input="validateEmail" />
  <span class="success-message" v-if="isEmailValid && email"> ✔ </span>
</div>
<div>
<span class="error-message" v-if="!isEmailValid && email"> ❌ 이메일 형식이 맞지 않습니다.</span>
</div>

<div class="form-group">
  <label for="password" class="form-label">기존 비밀번호</label>
  <input type="password" id="password" class="form-input" v-model="password" @input="validatePassword" />
  <span class="success-message" v-if="isPasswordValid && password && confirmPassword"> ✔ 비밀번호가 일치합니다.</span>
</div>
<div>
<span class="error-message" v-if="!isPasswordValid && password && confirmPassword"> ❌ 비밀번호가 일치하지 않습니다.</span>
</div>

<div class="form-group">
    <label for="gisu" class="form-label">기수</label>
    <input type="text" id="gisu" class="form-input" v-model="gisu" />
</div>

<div class="form-group">
    <label for="studentType" class="form-label">학생유형</label>
    <input type="text" id="studentType" class="form-input" v-model="studentType" />
</div>
   <router-link to="/sidebartest" class="btn-save">저장</router-link>

</form>
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

<style scoped>
.error-message, .success-message {
display: none;
}

.title-group {
display: flex;
justify-content: left;
margin-top: 2vw;
}

.title-label {
font-size: 25px; /* 상대적인 단위로 변경 */
font-weight: bold;
color: #484848;
margin-left: 1vw; /* 상대적인 단위로 변경 */
margin-bottom: 15px ;
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
width: 30vw; /* 상대적인 단위로 변경 */
height: 41px;
border-radius: 6px;
border: 1px solid rgba(217, 217, 217, 1);
margin-bottom: 15px;
}

.btn-save {
border-radius: 9px;
border: none;
background-color: #ffde80;
width: 21vw; /* 상대적인 단위로 변경 */
max-width: 100%;
font-size: 1.5vw; /* 상대적인 단위로 변경 */
font-weight: bold;
color: #484848;
margin-top: 1vw; /* 상대적인 단위로 변경 */
margin-left: 12.5vw; /* 상대적인 단위로 변경 */
padding: 20px; /* 상대적인 단위로 변경 */
cursor: pointer;
position: relative;
display: inline-flex;
align-items: center;
justify-content: center;
text-decoration:none;
}
.btn-save:hover {
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

.form-page {
margin-top: 35px;
}
</style>