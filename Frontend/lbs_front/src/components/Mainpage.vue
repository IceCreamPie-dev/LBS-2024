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
      <table class="table">
        <thead>
          <tr>
            <th>교양</th>
            <th>졸업</th>
            <th>이수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>{{ row.name }}</td>
            <td>{{ row.subjects[0].credit }}</td>
            <td>{{ row.subjects[1].credit }}</td>
          </tr>
        </tbody>
      </table>
  
      <h2></h2>
      <table class="table3">
        <thead>
          <tr>
            <th>동국소양</th>
            <th>기초교육 / 공통</th>
            <th>기초교육 / 계열</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
          </tr>
        </tbody>
      </table>
  
      <h2></h2>
      <table class="table4">
        <thead>
          <tr>
            <th>동국소양</th>
            <th>기초교육 / 공통</th>
            <th>기초교육 / 계열</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
          </tr>
        </tbody>
      </table>
  
      <h2></h2>
      <table class="table5">
        <thead>
          <tr>
            <th>동국소양</th>
            <th>기초교육 / 공통</th>
            <th>기초교육 / 계열</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.name }}</td>
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
          { name: '기초교육공통', credit: '8', credit2: '8' },
          { name: '기초교육계열', credit: '6', credit2: '6' },
          { name: '교양교육', credit: '18', credit2: '15' },
          { name: '단수전공', credit: '66', credit2: '63' },
          { name: '졸업학점', credit: '130', credit2: '119' }
        ],
        rows: [
          { 
            name: '제 1영역', 
            subjects: [
              { credit: '4' },
              { credit: '18' },
            ] 
          },
          { 
            name: '제 2영역', 
            subjects: [
              { credit: '6' },
              { credit: '22' },
            ] 
          },
          { 
            name: '제 3영역', 
            subjects: [
              { credit: '3' },
              { credit: '25' },
            ] 
          },
          { 
            name: '제 4영역', 
            subjects: [
              { credit: '5' },
              { credit: '30' },
            ] 
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: center;
  }
  
  .table th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  
  .table3,.table4,.table5 {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table3 th, .table3 td, .table4 th, .table4 td, .table5 th, .table5 td{
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: center;
  }
  
  .table3 th, .table4 th, .table5 th{
    background-color: #f8f9fa;
    font-weight: bold;
  }
  </style>