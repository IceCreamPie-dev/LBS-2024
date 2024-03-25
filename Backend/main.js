const mysql = require('mysql2');
const express = require('express');
const app = express();
const exel = require('xlsx');

// 데이터 베이스에 연결
// 원래 이러한 정보는 환경 변수로 설정해야 합니다. ex) process.env.DB_HOST
// 이 예제에서는 편의상 하드코딩하였습니다.
const tomysql = mysql.createConnection({
  host: '158.179.174.75',
  user: 'gohomehelper',
  password: 'lbs20240313',
  database: 'lbs'
});

// 데이터 베이스 연결 확인
tomysql.connect((err) => {
  if (err) {
    console.error('[오류] 데이터 베이스에 연결하던 중 오류 발생:', err);
    return;
  }
  console.log('[연결됨] 데이터 베이스에 연결됨');
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
  tomysql.query('INSERT INTO Users (email, password, name) VALUES (?, ?, ?)', [email, password, name], (err, results) => {
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

// 게시물 조회
app.get('/board', (req, res) => {
});

// 게시물 작성
app.post('/board', (req, res) => { 
  // 게시물 작성자 이메일, 제목, 내용을 받음
  const { title, content, email } = req.body;
  // 게시물 작성 제목, 내용 작성날짜 저장
  tomysql.query('INSERT INTO QnA (email, title, content, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', [title, content], (err, results) => {
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
  // 게시물 수정자 이메일, 제목, 내용을 받음
  const { title, content, email } = req.body;
  // 게시물 수정자가 관리자거나 게시물 작성자인 경우에만 수정 가능
  tomysql.query('UPDATE QnA SET title = ?, content = ?, updated_at = NOW() WHERE id = ?', [title, content, req.params.id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 삭제
app.delete('/board/:id', (req, res) => {
  // 게시물 삭제자 이메일을 받음
  const { email } = req.body;
  // 게시물 삭제 역할이 관리자이거나 게시물 작성자인 경우에만 삭제 가능
  tomysql.query('DELETE FROM QnA WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 삭제중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('[서버시작] 포트 3000 에서 듣는 중...');
});