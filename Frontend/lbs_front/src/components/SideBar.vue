<template>
<link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div class="main-container">
    <div class="signup-container">
      <div class="signup-form">
      </div>
    </div>
    <div class="menu-container">
      <div class="user-profile" v-if="isLogin" :class="{ 'profile-logged-in': isLogin }">
        <div class="profile-image">
          <a href="#"><img src="../assets/user.png" alt="사용자 이미지"></a>
        </div>
        <div class="profile-details">
          <div class="user-info">
            <label class="username">{{ username }}</label>
            <label for="no">|</label>
            <label class="role">{{ role }}</label>
          </div>
          <div class="user-email">{{ email }}</div>
          <button class="logout-button" @click="Logout">로그아웃</button>
        </div>
      </div>
      <div class="user-profile" v-else :class="{ 'profile-logged-out': !isLogin }">
        <router-link to="/login" class="login-button">
          <img class="login-img" src="../assets/doumi-login.png" alt="졸업도우미 로그인">
        </router-link>
      </div>
      <ul class="menu-list">
        <li><a herf="#" @click="changePage('NULL')">졸업계산기</a></li>
        <li><a href="#" @click="changePage('Gonggi')">공지사항</a></li>
        <li v-if="isLogin"><a href="#" @click="changePage('MyPage')">마이페이지</a></li>
        <li><a href="#" @click="changePage('QnA')">Q&A 게시판</a></li>
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
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      showModal: false,
      isLogin: false,
      username: '',
      email: '',
      role: ''
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogin = true;
      const decoded = jwtDecode(token);
      this.username = decoded.name;
      this.email = decoded.email;
      this.role = decoded.role.toString() === '1' ? '관리자' : '유저';
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    changePage(page) {
      this.emitter.emit('change-page', page);
    },
    async Logout() {
      await this.$store.dispatch('logout');
      this.isLogin = false;
      this.username = '';
      this.email = '';
      this.role = '';
      this.$router.push('/');
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
  flex-direction: row-reverse; /* 메뉴가 오른쪽에서 왼쪽으로 이동하도록 설정 */
  justify-content: space-between;
  width: 100%;
  margin-left: 5%;
  font-family: 'NanumSquareNeo';
  margin-top:27%;
}

.main {
  flex-grow: 1; /* 메인 영역이 남은 공간을 차지하도록 설정 */
}

.main-component {
  transition: transform 0.5s ease; /* 동적 컴포넌트의 이동 애니메이션 설정 */
}

.main-component-enter-active,
.main-component-leave-active {
  transition: transform 0.5s ease; /* 동적 컴포넌트의 이동 애니메이션 설정 */
}

.main-component-enter,
.main-component-leave-to {
  transform: translateX(100%); /* 컴포넌트가 오른쪽에서 왼쪽으로 이동하도록 설정 */
}
  /*---------------------------------------------------------------------------------------- */
  @media  screen and (max-width: 1500px){

.main-container {
display: flex;
flex-direction: row-reverse; /* 메뉴가 오른쪽에서 왼쪽으로 이동하도록 설정 */
justify-content: space-between;
width: 90%;
font-family: 'NanumSquareNeo';
margin-top:80px;
}

.menu-container .user-profile.profile-logged-in {
/* 로그인된 사용자의 경우 스타일 */
border-radius: 10px;
border-bottom: #FFDE80 7px solid;
border-left: #FFDE80 1px solid;
border-right: #FFDE80 1px solid;
border-top: #FFDE80 1px solid;
color: #5c5c5c;
display: flex;
max-width: 330px;
padding-left: 16px;
gap: 15px;
align-items: center;
transition: box-shadow 0.3s ease; /* 그림자 애니메이션 적용 */

}

.menu-container .user-profile.profile-logged-out {
/* 로그아웃된 사용자의 경우 스타일 */
border-bottom: #FFE8A6 8px solid;
background-color: #ffbd4b; /* 배경색을 다르게 설정 */
/*background: linear-gradient(to right, #fcc550, #ffc155);*/
transition: box-shadow 0.3s ease; /* 그림자 애니메이션 적용 */
border-radius: 10px;
display: flex;
max-width: 330px;
}

.login-img{
width: 100%;
height: 100%;
}
.login-img:hover{
opacity: 1;
}
.menu-container .user-profile.profile-logged-out:hover{
box-shadow: 2px 2px 5px rgba(148, 148, 148, 0.5); /* 그림자 효과 */
}

.menu-container .user-profile.profile-logged-in:hover{
box-shadow: 0px 1px 4px rgba(148, 148, 148, 0.5); /* 그림자 효과 */
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
  margin-left: 27px;
  margin-top: 3px;
  padding: 3px;
  opacity: 0.85;
}

.username, .role {
  align-self: flex-start;
  display: block;
  padding: 2px;
  margin-left: 2px;
  margin-right: 2px;
  font-size: 14.5px;
}

.user-email {
  font-size: 13px;
  margin: 3px;
  opacity: 0.85;
  margin-left: 8.5px;
}

.logout-button {
  width: 130px;
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
  border-radius: 10px;
  border-bottom: #FFDE80 8px solid;
  border-left: #FFDE80 1px solid;
  border-right: #FFDE80 1px solid;
  border-top: #FFDE80 1px solid;
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
  width: 260px;
  align-items: left;
  margin-bottom:2px ; /*선 요소에 대한 불투명도 조절 : 시각적 요소를 위해 넣었음 ! */
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
  width: 260px;
  padding: 10px;
  text-align: center;
}

.guid-menu li {
  position: relative; 
  justify-content: flex-start;
}
.menu-list li:hover{
  border-bottom: rgba(138, 114, 88, 0.9) 8px solid;
  border-left: rgba(138, 114, 88, 0.9) 1px solid;
  border-right: rgba(138, 114, 88, 0.9) 1px solid;
  border-top: rgba(138, 114, 88, 0.9) 1px solid;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
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


}

  @media  screen and (min-width: 1500px){
  .main-container {
  display: flex;
  flex-direction: row-reverse; /* 메뉴가 오른쪽에서 왼쪽으로 이동하도록 설정 */
  justify-content: space-between;
  width: 90%;
  font-family: 'NanumSquareNeo';
  margin-top:80px;
}

  .menu-container .user-profile.profile-logged-in {
  /* 로그인된 사용자의 경우 스타일 */
  border-radius: 10px;
  border-bottom: #FFDE80 7px solid;
  border-left: #FFDE80 1px solid;
  border-right: #FFDE80 1px solid;
  border-top: #FFDE80 1px solid;
  color: #5c5c5c;
  display: flex;
  max-width: 330px;
  padding-left: 16px;
  gap: 15px;
  align-items: center;
  transition: box-shadow 0.3s ease; /* 그림자 애니메이션 적용 */
  
  }

  .menu-container .user-profile.profile-logged-out {
  /* 로그아웃된 사용자의 경우 스타일 */
  border-bottom: #FFE8A6 8px solid;
  background-color: #ffbd4b; /* 배경색을 다르게 설정 */
  /*background: linear-gradient(to right, #fcc550, #ffc155);*/
  transition: box-shadow 0.3s ease; /* 그림자 애니메이션 적용 */
  border-radius: 10px;
  display: flex;
  max-width: 330px;
  }
  
  .login-img{
  width: 100%;
  height: 100%;
}
.login-img:hover{
  opacity: 1;
}
  .menu-container .user-profile.profile-logged-out:hover{
  box-shadow: 2px 2px 5px rgba(148, 148, 148, 0.5); /* 그림자 효과 */
}

.menu-container .user-profile.profile-logged-in:hover{
  box-shadow: 0px 1px 4px rgba(148, 148, 148, 0.5); /* 그림자 효과 */
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
    margin-left: 27px;
    margin-top: 3px;
    padding: 3px;
    opacity: 0.85;
  }
  
  .username, .role {
    align-self: flex-start;
    display: block;
    padding: 2px;
    margin-left: 2px;
    margin-right: 2px;
    font-size: 14.5px;
  }

  .user-email {
    font-size: 13px;
    margin: 3px;
    opacity: 0.85;
    margin-left: 8.5px;
  }
  
  .logout-button {
    width: 130px;
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
    border-radius: 10px;
    border-bottom: #FFDE80 8px solid;
    border-left: #FFDE80 1px solid;
    border-right: #FFDE80 1px solid;
    border-top: #FFDE80 1px solid;
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
    width: 260px;
    align-items: left;
    margin-bottom:2px ; /*선 요소에 대한 불투명도 조절 : 시각적 요소를 위해 넣었음 ! */
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
    width: 260px;
    padding: 10px;
    text-align: center;
  }
  
  .guid-menu li {
    position: relative; 
    justify-content: flex-start;
  }
  .menu-list li:hover{
    border-bottom: rgba(138, 114, 88, 0.9) 8px solid;
    border-left: rgba(138, 114, 88, 0.9) 1px solid;
    border-right: rgba(138, 114, 88, 0.9) 1px solid;
    border-top: rgba(138, 114, 88, 0.9) 1px solid;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
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

}


.logout-button{
  font-family: 'NanumSquareNeo';
}

</style>