<template>
    <div>
      <h1>졸업 요건 확인</h1>
      <input type="file" @change="handleFileUpload" accept=".xlsx" />
      <button @click="checkGraduation">졸업 요건 확인</button>
      <div v-if="result">
        <h2>현재 학점</h2>
        <p>동국 소양: {{ result.data.std_dk_score }}</p>
        <p>공통 기초교육: {{ result.data.std_cm_score }}</p>
        <p>계열 기초교육: {{ result.data.std_sub_score }}</p>
        <p>교양교육: {{ result.data.std_liberal_score }}</p>
        <p>단수전공: {{ result.data.std_single_score }}</p>
        <p>총 학점: {{ result.data.std_total_score }}</p>
  
        <h2>졸업 요건 학점</h2>
        <p>동국 소양: {{ result.data.rq_dk_score }}</p>
        <p>공통 기초교육: {{ result.data.rq_cm_score }}</p>
        <p>계열 기초교육: {{ result.data.rq_sub_score }}</p>
        <p>교양교육: {{ result.data.rq_liberal_score }}</p>
        <p>단수전공: {{ result.data.rq_single_score }}</p>
        <p>총 학점: {{ result.data.rq_total_score }}</p>
  
        <h2>영역별 이수 여부</h2>
        <p>제1영역:문학/역사/철학: {{ result.data.is_type_1 }}</p>
        <p>제2영역:정치/사회/심리: {{ result.data.is_type_2 }}</p>
        <p>제3영역:과학/기술/생명: {{ result.data.is_type_3 }}</p>
        <p>제4영역:예술/문화: {{ result.data.is_type_4 }}</p>
        <p>기초: {{ result.data.is_type_5 }}</p>
        <p>전문: {{ result.data.is_type_6 }}</p>
        <p>인성: {{ result.data.is_type_7 }}</p>
        <p>자기계발: {{ result.data.is_type_8 }}</p>
        <p>공통교육: {{ result.data.is_type_9 }}</p>
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