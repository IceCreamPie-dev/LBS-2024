<template>
    <div class="signup-form">
          <img src="../assets/logo.png" alt="logo" class="logo"/>    
          <form class="title-fields">
            <div class = "title-group">
              <label for="title" class="title-label">마이페이지</label>
            </div>
          </form>
        </div>
</template>

<style scoped>
  .error-message, .success-message {
    display: none;
  }
  
  .header {
    background-color: #FFDE80; /* 원하는 배경색 지정 */
    color: #fff;
    padding: 20px;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .footer {
    background-color: #FFDE80; /* 원하는 배경색 지정 */
    color: #fff;
    padding: 20px;
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
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
  
  .btn-save {
    border-radius: 9px;
    border: none;
    background-color: #ffde80;
    width: 30vw; /* 상대적인 단위로 변경 */
    max-width: 100%;
    font-size: 1.5vw; /* 상대적인 단위로 변경 */
    font-weight: bold;
    color: #484848;
    margin-top: 1vw; /* 상대적인 단위로 변경 */
    margin-left: 10vw; /* 상대적인 단위로 변경 */
    padding: 7px; /* 상대적인 단위로 변경 */
    cursor: pointer;
    position: relative;
  }
  .btn-save:hover {
    background-color: #ffd56c;
    color: rgb(56, 39, 0);
    font-weight: bold;
  }
  .btn-save {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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