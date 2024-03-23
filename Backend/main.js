const mysql = require('mysql2');
const express = require('express');
const app = express();
const exel = require('xlsx');

// 데이터 베이스에 연결
// 원래 이러한 정보는 환경 변수로 설정해야 합니다. ex) process.env.DB_HOST
// 이 예제에서는 편의상 하드코딩하였습니다.
const tomysql = mysql.createConnection({
  host: 'lbs',
  user: 'root',
  password: 'lbs1234!',
  database: 'lbs1234!'
});

// 데이터 베이스 연결 확인
tomysql.connect((err) => {
  if (err) {
    console.error('[오류] 데이터 베이스에 연결하던 중 오류 발생:', err);
    return;
  }
  console.log('[연결됨] 데이터 베이스에 연결되었습니다.');
});

// 로그인 요청
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // 이메일과 비밀번호로 사용자 조회
  tomysql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('[오류] 사용자 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    if (results.length === 0) {
      res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
      return;
    }
    res.json(results[0]);
  });
});

// 회원가입 요청 - 이름, 이메일, 비밀번호
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  // 사용자 생성
  tomysql.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, password, name], (err, results) => {
    if (err) {
      console.error('[오류] 사용자 생성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 성적 계산 요청 프론트에서 xlsx 보내줌 
app.post('/calgradexlsx', (req, res) => {
  // 엑셀 파일을 읽어서 성적을 계산
  const workbook = exel.read(req.body);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = exel.utils.sheet_to_json(sheet, { header: 'A' });
  // 성적 계산
});

// DB에 저장된 자신의 성적기록 수정

// DB에 저장된 자신의 성적기록 삭제

// DB에 저장된 자신의 성적기록 조회

// 게시판 요청 모음
// 게시물 조회
app.get('/board', (req, res) => {
});

// 게시물 작성
app.post('/board', (req, res) => { 
  const { title, content } = req.body;
  // 게시물 작성 제목, 내용 작성날짜 저장
  tomysql.query('INSERT INTO board (title, content, createdAt, editedAt) VALUES (?, ?, NOW(), NOW())', [title, content], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 작성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 수정
app.put('/board/:id', (req, res) => {
});

// 게시물 삭제

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});