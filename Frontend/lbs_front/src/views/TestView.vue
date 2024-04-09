<template>
  <div>
    <h1>졸업 요건 확인</h1> <input type="file" @change="handleFileUpload" accept=".xlsx" /> <button
      @click="checkGraduation">졸업 요건 확인</button>
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
    };
  },
  computed: {
    hasAnyData() {
      return (
        (this.result.data.is_type_1.length > 0 && this.result.data.is_type_1[0].length > 0) ||
        (this.result.data.is_type_2.length > 0 && this.result.data.is_type_2[0].length > 0) ||
        (this.result.data.is_type_3.length > 0 && this.result.data.is_type_3[0].length > 0) ||
        (this.result.data.is_type_4.length > 0 && this.result.data.is_type_4[0].length > 0) ||
        (this.result.data.is_type_5.length > 0 && this.result.data.is_type_5[0].length > 0) ||
        (this.result.data.is_type_6.length > 0 && this.result.data.is_type_6[0].length > 0) ||
        (this.result.data.is_type_7.length > 0 && this.result.data.is_type_7[0].length > 0) ||
        (this.result.data.is_type_8.length > 0 && this.result.data.is_type_8[0].length > 0) ||
        (this.result.data.is_type_9.length > 0 && this.result.data.is_type_9[0].length > 0) ||
        // 다른 is_type_ 데이터도 검사할 수 있습니다.
        false
      );
    }
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
      formData.append('year', '1000'); // 연도 값을 적절히 수정하세요.
      formData.append('type', '일반'); // 학위 유형 값을 적절히 수정하세요.

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
/*.v-application {
  font-family: 'NanumBarunGothic', sans-serif !important;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothic.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothicLight.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothicBold.ttf') format('truetype');
  font-weight: 700;
}
*/

.table,
.table2,
.table3,
.table4,
.table5 {
  width: 100%;
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

/*.table2 td span{
  border: #4b4238 solid 1px;
  padding: 10px;
  width: 200px;
}
*/

.red-background {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
</style>