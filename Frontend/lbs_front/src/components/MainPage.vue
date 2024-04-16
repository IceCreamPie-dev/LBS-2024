<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css" rel="stylesheet">
  <div>
    <div class = "title-group">
    <label for="title" class="title-label">졸업요건 확인</label>
  </div> 
  <div class="yellow-line"></div>
  <div class="main-style">
  <input type="file" @change="handleFileUpload" accept=".xlsx" /> 
    <input type="text" v-model="year" placeholder="연도를 입력하세요" />
    <select v-model="type">
      <option value="일반">일반</option>
      <option value="외국인">특별</option>
      <option value="복수전공">복수전공</option>
      <option value="편입">부전공</option>
    </select>
    <button
      @click="checkGraduation">졸업 요건 확인</button>
  </div>
      <div v-if="result">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>동국소양</th>
            <th>기초교육 공통</th>
            <th>기초교육 계열</th>
            <th>교양교육</th>
            <th>단수전공</th>
            <th>졸업학점</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>졸업</td>
            <td>{{ result.data.rq_dk_score }}</td>
            <td>{{ result.data.rq_cm_score }}</td>
            <td>{{ result.data.rq_sub_score }}</td>
            <td>{{ result.data.rq_liberal_score }}</td>
            <td>{{ result.data.rq_single_score }}</td>
            <td>{{ result.data.rq_total_score }}</td>
          </tr>
          <tr>
            <td>이수</td>
            <td>{{ result.data.std_dk_score }}</td>
            <td>{{ result.data.std_cm_score }}</td>
            <td>{{ result.data.std_sub_score }}</td>
            <td>{{ result.data.std_liberal_score }}</td>
            <td>{{ result.data.std_single_score }}</td>
            <td>{{ result.data.std_total_score }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table3">
        <thead>
          <tr>
            <th>교양</th>
            <th>졸업</th>
            <th>이수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제 1영역 : 문학/역사/철학/종교</td>
            <td>{{ result.data.rq_lib_1 }}</td>
            <td>{{ result.data.std_lib_1 }}</td>
          </tr>
          <tr>
            <td>제 2영역 : 정치/경제/사회/심리</td>
            <td>{{ result.data.rq_lib_2 }}</td>
            <td>{{ result.data.std_lib_2 }}</td>
          </tr>
          <tr>
            <td>제 3영역 : 과학/기술/환경</td>
            <td>{{ result.data.rq_lib_3 }}</td>
            <td>{{ result.data.std_lib_3 }}</td>
          </tr>
          <tr>
            <td>제 4영역 : 예술/체육</td>
            <td>{{ result.data.rq_lib_4 }}</td>
            <td>{{ result.data.std_lib_4 }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table3">
        <thead>
          <tr>
            <th>분류 </th>
            <th>이름</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in result.data.std_professional" :key="index">
            <td>전공</td>
            <td>{{ subject[0] }}</td>
            <td :class="{ 'red-background': !subject[1] }">{{ subject[1] ? '이수' : '미이수' }}</td>
          </tr>
          <tr v-for="(subject, index) in result.data.std_soyang" :key="index">
            <td>소양</td>
            <td>{{ subject[0] }}</td>
            <td :class="{ 'red-background': !subject[1] }">{{ subject[1] ? '이수' : '미이수' }}</td>
          </tr>
          <tr v-for="(subject, index) in result.data.std_common" :key="index">
            <td>공통</td>
            <td>{{ subject[0] }}</td>
            <td :class="{ 'red-background': !subject[1] }">{{ subject[1] ? '이수' : '미이수' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      result: null,
      year: '',
      type: '일반',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async checkGraduation() {
      if (!this.file) {
        alert('엑셀 파일을 선택해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('year', this.year); // 연도 값을 적절히 수정하세요.
      formData.append('type', this.type); // 학위 유형 값을 적절히 수정하세요.

      try {
        const response = await axios.post('/api/calgradexlsx', formData);
        this.result = response.data;
      } catch (error) {
        console.error(error);
        alert('졸업 요건 확인 중 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
/*최대 1700px까지 적용*/
@media screen and (max-width: 1500px) {
  .main-style {
  background-color: rgb(255, 222, 128, 0.7);
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input[type="file"] {
    border-radius: 5px;
    width: 220px;

  
  }

input{
  padding: 8px;
}

select {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
}


button {
  background-color: rgb(134, 117, 95);
  width: 130px;
  color: #fffcf4;
  border: none;
  border-radius: 3px;
  margin-right: 5px;
  padding: 10px;
  cursor: pointer;
  font-family: 'NanumSquareNeobold';
  font-size: 15px;
}

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
 }

.result{
  font-family: 'NanumSquareNeo';
}

@media screen and (min-width:1500px){
  .main-style {
  background-color: rgb(255, 222, 128, 0.7);
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  gap:px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input[type="file"] {
    border-radius: 5px;
    width: 15vw;
    margin-right: 15%;
  }

input{
  padding: 8px;
}

select {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
}


button {
  background-color: rgb(134, 117, 95);
  width: 130px;
  color: #fffcf4;
  border: none;
  border-radius: 3px;
  padding: 10px;
  margin-left: 20px;
  cursor: pointer;
  font-family: 'NanumSquareNeobold';
  font-size: 15px;
}

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
}

.table,
.table2,
.table3,
.table4,
.table5 {
  width: 100%;
  font-family: 'NanumSquareNeo';
  margin-top: 2%;
  border-collapse: collapse;
  border-left: 1px solid rgb(255, 222, 128, 0.9);
  border-right: 1px solid rgb(255, 222, 128, 0.9);
  border-top: 1px solid rgb(255, 222, 128, 0.9);
  border-bottom: 1px solid rgb(255, 222, 128, 0.9);
  color: rgb(75, 66, 56, 0.9);
}

.table th,
.table td,
.table2 th,
.table2 td,
.table3 th,
.table3 td,
.table4 th,
.table4 td,
.table5 th,
.table5 td {
  border: none;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}

.table3 th,
.table3 td,
.table4 th,
.table4 td,
.table5 th,
.table5 td {
  border-right: 1px solid rgb(255, 222, 128, 0.9);
}

.table th,
.table td,
.table2 th,
.table2 td {
  border-bottom: 1px solid rgb(255, 222, 128, 0.9);
}

.table th,
.table2 th,
.table2 th,
.table3 th,
.table4 th,
.table5 th {
  background-color: rgb(255, 222, 128, 0.9);
  color: #4b4238;

  font-weight: bold;

}


.red-background {
  background-color: rgb(255, 99, 99);
  font-family: 'NanumSquareNeobold';
  color: white;
  border: none;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
</style>