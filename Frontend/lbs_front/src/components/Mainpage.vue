<template>
  <div>
    <h2></h2>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="(subject, index) in subjects" :key="index">{{ subject.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>졸업</td>
          <td v-for="(subject, index) in subjects" :key="index">{{ subject.credit }}</td>
        </tr>
        <tr>
          <td>이수</td>
          <td v-for="(subject, index) in subjects" :key="index">{{ subject.credit2 }}</td>
        </tr>
      </tbody>
    </table>

    <h2></h2>
    <table class="table2">
      <thead>
        <tr>
          <th>교양</th>
          <th>졸업</th>
          <th>이수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td><span>{{ row.name }}</span></td>
          <td><label>{{ row.subjects[0].credit }}</label></td>
          <td><label>{{ row.subjects[1].credit }}</label></td>
        </tr>
      </tbody>
    </table>

    <h2></h2>
    <table class="table3">
        <thead>
          <tr>
            <th>동국소양</th>
            <th>기초교육 공통</th>
            <th>기초교육 계열</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in table3Subjects" :key="index">
          <td>{{ subject.subjects[0] }}</td>
          <td>{{ subject.subjects[1] }}</td>
          <td>{{ subject.subjects[2] }}</td>
        </tr>
        </tbody>
    </table>

    <h2></h2>
    <table class="table4">
      <thead>
          <tr>
            <th>교직이론 (6개)</th>
            <th>교직소양</th>
            <th>교육실습</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in table4Subjects" :key="index">
          <td>{{ subject.subjects[0] }}</td>
          <td>{{ subject.subjects[1] }}</td>
          <td>{{ subject.subjects[2] }}</td>
        </tr>
        </tbody>
    </table>

    <h2></h2>
    <table class="table5">
      <thead>
          <tr>
            <th>교직 / 교과교육</th>
            <th>교직 / 기본이수과목</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in table5Subjects" :key="index">
          <td>{{ subject.subjects[0] }}</td>
          <td>{{ subject.subjects[1] }}</td>
          <td>{{ subject.subjects[2] }}</td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        { name: '동국소양', credit: '6', credit2: '6' },
        { name: '기초교육 공통', credit: '8', credit2: '8' },
        { name: '기초교육 계열', credit: '6', credit2: '6' },
        { name: '교양교육', credit: '18', credit2: '15' },
        { name: '단수전공', credit: '66', credit2: '63' },
        { name: '졸업학점', credit: '130', credit2: '119' }
      ],
      rows: [
        { 
          name: '제 1영역 : 문학/역사/철학/종교', 
          subjects: [
            { credit: '4' },
            { credit: '18' },
          ] 
        },
        { 
          name: '제 2영역 : 정치/경제/사회/심리', 
          subjects: [
            { credit: '6' },
            { credit: '22' },
          ] 
        },
        { 
          name: '제 3영역 : 과학/기술/생명', 
          subjects: [
            { credit: '3' },
            { credit: '25' },
          ] 
        },
        { 
          name: '제 4영역 : 예술/문화', 
          subjects: [
            { credit: '5' },
            { credit: '30' },
          ] 
        }
      ],
      table3Subjects: [
        { subjects: ['자아와명상 1', '글쓰기 1', '일반수학 1'] },
        { subjects: ['자아와명상 2', '글쓰기 2', '일반수학 2'] },
        { subjects: ['불교와인간', 'FreshmanEnglish 1', ''] },
        { subjects: ['동국인의 자기계발 1', 'FreshmanEnglish 2', ''] },
        { subjects: ['동국인의 자기계발 2', 'ApproachestoEnglishCommunication', ''] },
        { subjects: ['', 'ApproachestoEnglishCommunication 2', ''] }
      ],
      table4Subjects: [
        { subjects: ['교직학개론', '특수교육학개론', '학교현장실습'] },
        { subjects: ['교육심리', '교직실무', '교육봉사활동 1'] },
        { subjects: ['교육철학및교육사', '학교폭력예방및학생의이해', '교육봉사활동 2'] },
        { subjects: ['교육과정및교육평가', '', ''] },
        { subjects: ['교육방법및교육공학', '', ''] },
        { subjects: ['교육행정및교육경영', '', ''] },
      ],
      table5Subjects: [
        { subjects: ['수학교육론', '해석학', ''] },
        { subjects: ['수학교재연구및지도법', '수학논리및논술', '확률및통계'] },
        { subjects: ['', '현대대수학1', '미분기하학1'] },
        { subjects: ['', '', '수학교육론'] },
        { subjects: ['', '', '복소해석학'] }
      ]
    };
  }
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

.table,.table2,.table3,.table4,.table5
 { width: 100%;
  border-collapse: collapse;
  border-left: 1px solid rgb(255, 222, 128, 0.9);
  border-right: 1px solid rgb(255, 222, 128, 0.9);
  border-top: 1px solid rgb(255, 222, 128, 0.9);
  border-bottom: 1px solid rgb(255, 222, 128, 0.9); 
  color: rgb(75, 66, 56, 0.9);
}

.table th, .table td,.table2 th,.table2 td,.table3 th, .table3 td, .table4 th, .table4 td, .table5 th, .table5 td{
  border: none;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
} 

.table3 th, .table3 td, .table4 th, .table4 td, .table5 th, .table5 td{
  border-right: 1px solid rgb(255, 222, 128, 0.9);
}

.table th, .table td,.table2 th,.table2 td{
  border-bottom: 1px solid rgb(255, 222, 128, 0.9);
}

.table th,.table2 th, .table2 th,.table3 th, .table4 th, .table5 th {
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

</style>