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
@import url('@/styles/MypageMonit.css');
</style>