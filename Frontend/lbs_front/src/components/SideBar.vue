<template>
      <div class="main-container">
        <div class="signup-container">
          <div class="signup-form">
          </div>
        </div>
        <div class="menu-container">
          <div class="user-profile">
            <div class="profile-image">
            <a href="#"><img src="../assets/user.png" alt="사용자 이미지"></a>
            </div>
            <div class="profile-details">
              <div class="user-info">
                <label class="username">홍길동님</label>
                <label for="no">|</label>
                <label class="user-role">교직이수</label>
              </div>
              <div class="user-email">abc22@gmail.com</div>
              <button class="logout-button">로그아웃</button>
            </div>
          </div>
          <ul class="menu-list">
            <li><a href="#">공지사항</a></li>
            <li><a href="#">마이페이지</a></li>
            <li><a href="#">Q&A 게시판</a></li>
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
  export default {
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal;
      }
    }
  };
  </script>
  
  
  <style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  /*---------------------------------------------------------------------------------------- */
  
  .user-profile {
    border-radius: 10px;
    border: 1px solid rgba(255, 222, 128, 1);
    color: #5c5c5c;
    display: flex;
    max-width: 330px;
    padding-left: 16px;
    gap: 15px;
    align-items: center;
  
  }
  
  .profile-image img {
    width: 65px;
    height: 65px;
    margin-top: 12px;
  }
  
  .profile-details {
    display: flex;
    flex-direction: column;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-left: 3px;
    margin-top: 3px;
    padding: 3px;
    opacity: 0.85;
  }
  
  .username, .user-role {
    align-self: flex-start;
    display: block;
    padding: 2px;
    margin-left: 4px;
    margin-right: 5px;
    font-size: 13px;
  }
  
  /* 부가기능
  .separator {
    aspect-ratio: 0.07;
    object-fit: auto;
    object-position: center; 
    width: 1px;
    stroke-width: 1px;
    stroke: #000;
    border: 1px solid rgba(0, 0, 0, 1);
  }
  */
  
  .user-email {
    font-size: 15px;
    opacity: 0.85;
    margin-left: 5px;
  }
  
  .logout-button {
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    padding: 3px;
    font-size: 13px;
    border: none;
    background-color: rgba(255, 222, 128, 1);
    color: #605548;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  /*---------------------------------------------------------------------------------------- */
  a{
    text-decoration: none;
    color: #605548;
  }
  
  ul{
    list-style-type: none;
  }
  
  .menu-container {
    width: 280px; /* 메뉴 컨테이너의 너비 지정 */
  }
  
  .menu-list {
    list-style-type: none;
    padding: 0;
    font-size: 25px;
    font-weight: 600;
    color: #605548;
  }
  
  .menu-list li {
    margin-bottom: 10px; 
    padding: 15px;
    border: #FFDE80 1px solid;
    border-right: 20px solid #FFDE80;
    text-align: left;
    cursor: pointer;
    opacity: 0.83; /*글자색의 불투명도 조절*/
    transition: box-shadow 0.3s ease;
  }
  
  .guid {
    margin-top: 50px;
  }
  
  .guid-menu {
    padding: 0;
    justify-content: flex-start;
    display: flex; /* flex 컨테이너로 설정 */
  }
  
  .guid-menu li img {
    width: 240px;
    align-items: left;
    margin-bottom:2px ;
    border-bottom: 3px solid rgba(96, 85, 72, 0.7); /*선 요소에 대한 불투명도 조절 : 시각적 요소를 위해 넣었음 ! */
    opacity: 0.85;
    cursor: pointer;
  }
  
  .guid-modal {
    display: block; /* 모달 표시 */
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%); /* 수평 정렬 */
    top: calc(100% + 1px); /* 상단과 일정한 간격을 유지 */
    transition: opacity 0.3s ease; /* 투명도 변화에 대한 애니메이션 설정 */
    border: 1px solid #ccc;
    width: 240px;
    padding: 10px;
    text-align: center;
  }
  
  .guid-menu li {
    position: relative; 
    justify-content: flex-start;
  }
  .menu-list li:hover{
    border: rgb(96, 85, 72, 0.8) 1px solid;
    border-right: 20px solid #605548;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.3);
  }
  
  .show-modal {
    display: block;
    transform: translateY(0);
  }
  
  .logout-button:hover{
    background-color: rgb(255, 215, 104);
    font-weight: bolder;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
    
  }
  /*--------------------------------------------------------------------------*/
  .footer {
    background-color: #FFDE80;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  </style>