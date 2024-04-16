<template>
    <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
    <div class="title-group">
      <label for="title" class="title-label">공지사항</label>
    </div>
    <div class="yellow-line"></div>
    <div class="container">
  
      <form class="notice-form">
        <div class="form-group">
          <label for="title" class="label-title">제목</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div class="form-group2">
          <label for="content" class="label-content">내용</label>
          <textarea id="content" v-model="content" rows="15" required></textarea>
        </div>
        <div class="button-group">
          <button @click.prevent="createNotice" class="create-button">생성</button>
          <button @click.prevent="cancel" class="cancel-button">취소</button>
          
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    methods: {
      cancel() {
        // 작성 취소 시 실행되는 함수
        // 필요한 로직을 여기에 추가하세요.
      },
      createNotice() {
        // 공지사항 생성 시 실행되는 함수
        // 필요한 로직을 여기에 추가하세요.
      }
    }
  };
  </script>
  
  <style scoped>
  
   .title-group {
      display: flex;
      justify-content: left;
      margin-top: 20px;
      font-family: 'NanumSquareNeo';
      }
      
      .title-label {
      font-size: 27px; /* 상대적인 단위로 변경 */
      font-weight: bold;
      color: #484848;
      margin-left: 25px; /* 상대적인 단위로 변경 */
      margin-bottom: 5px ;
      }
  
  .container {
    max-width: 100%;
    height: 90%;
    margin: 0 auto;
  }
  
  .notice-form {
    margin: 0 auto; 
    margin: 2%;
    width: 92%;
    height: 90%;
    background-color:rgba(124, 110, 94, 0.9);
    color: #605548;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
    font-family: 'NanumSquareNeo';
  }
  
  .form-group {
    border-radius: 50px;
    padding: 1.5%;
    padding-bottom: 3%;
  }
  
  .form-group2 {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  
  .label-title{
    display: inline-block;
    font-size: 18px;
    font-family: 'NanumSquareNeobold';
    margin-right: 2%;
    margin-left: 2.5%;
    text-align: center;
    border-radius: 30px;
    background-color: #FFDE80;
    padding: 1.2%;
    width: 5%;
  }
  
  .label-content{
    display: inline-block;
    font-size: 18px;
    font-family: 'NanumSquareNeobold';
    margin-left: 2%;
    text-align: center;
    border-radius: 30px;
    width: 5%;
    padding: 1.2%;
    margin-bottom: 1.5%;
    background-color: #FFDE80;
  }
  
  
  input[type="text"]{
    width:80%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: vertical;
  }
  
  textarea {
    margin-left: 1%;
    width: 93%;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 2px 5px  rgba(0, 0, 0, 0.1);
    resize: vertical;
  }
  
  .button-group {
    text-align: center;
    font-family: 'NanumSquareNeo';
  
  }
  
  .cancel-button,
  .create-button {
    font-family: 'NanumSquareNeobold';
    font-size: 16px;
    width: 12%;
    padding: 1.8%;
    margin: 0 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: rgb(96, 85, 72,0.8);
    color: #ffffff;
    transition: box-shadow 0.3s ease;
  
  }
  
  .cancel-button:hover {
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.4);
  }
  
  .create-button {
    background-color: #FFDE80;
    color: #605548;
    transition: box-shadow 0.3s ease;
  }
  
  .create-button:hover {
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
  }
  </style>
