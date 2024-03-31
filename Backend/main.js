const mysql = require('mysql2');
const express = require('express');
const app = express();
const exel = require('xlsx');
const jwt = require('jsonwebtoken');

// 비밀키 설정
const secretKey = 'lbs20240001';

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
      res.status(401).json({ error: '내부 서버 오류' });
      return;
    }
    if (results.length === 0) {
      res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
      return;
    }
    // JWT 토큰 생성 성공시 토큰 전송
    const token = jwt.sign({ email, name: results[0].name, role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});

// 회원가입 요청 - 이름, 이메일, 비밀번호
app.post('/register', (req, res) => {
  const { email, password, name, student_id, type } = req.body;
  // 사용자 생성
  tomysql.query('INSERT INTO Users (email, password, name, student_id, type) VALUES (?, ?, ?, ?, ?)', [email, password, name, student_id, type], (err, results) => {
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

// 게시물 조회
app.get('/board/QnA/{post_id}', authenticateToken, (req, res) => {
  // 게시물 조회
  tomysql.query('SELECT * FROM QnA WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results[0]);
  });
});

// 게시물 생성
app.post('/board/QnA', authenticateToken, (req, res) => {
  // 게시물 작성자 이메일, 제목, 내용을 받음
  const { title, content } = req.body;
  const email = req.user.email;
  // 게시물 작성
  tomysql.query('INSERT INTO QnA (title, content, email, created_at) VALUES (?, ?, ?, NOW())', [title, content, email], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 작성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 수정
app.put('/board/:id', authenticateToken, (req, res) => {
  // 게시물 수정자 이메일, 제목, 내용을 받음
  const { title, content } = req.body;
  const email = req.user.email;
  // 게시물 수정 역할이 관리자이거나 게시물 작성자인 경우에만 수정 가능
  tomysql.query('UPDATE QnA SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 삭제
app.delete('/board/:id', authenticateToken, (req, res) => {
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

// 게시물 목록 조회
app.get('/board/:board_type', authenticateToken, (req, res) => {
  const { board_type } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  // 게시물 목록 조회
  tomysql.query(`SELECT * FROM ?? LIMIT ? OFFSET ?`, [board_type, +limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 게시물 댓글 조회
app.get('/board/:board_type/:post_id/comments', authenticateToken, (req, res) => {
  const { post_id } = req.params;
  // 게시물 댓글 조회
  tomysql.query('SELECT * FROM comments WHERE post_id = ?', [post_id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 댓글 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 게시물 댓글 생성
app.post('/board/:board_type/:post_id/comments', authenticateToken, (req, res) => {
  const { content } = req.body;
  const email = req.user.email;
  const { post_id } = req.params;
  // 게시물 댓글 생성
  tomysql.query('INSERT INTO comments (content, email, post_id, created_at) VALUES (?, ?, ?, NOW())', [content, email, post_id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 댓글 생성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 댓글 수정
app.put('/board/:board_type/:post_id/comments/:comment_id', authenticateToken, (req, res) => {
  const { content } = req.body;
  const email = req.user.email;
  const { comment_id } = req.params;
  // 게시물 댓글 수정
  tomysql.query('UPDATE comments SET content = ? WHERE id = ?', [content, comment_id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 댓글 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 게시물 댓글 삭제
app.delete('/board/:board_type/:post_id/comments/:comment_id', authenticateToken, (req, res) => {
  const { comment_id } = req.params;
  // 게시물 댓글 삭제
  tomysql.query('DELETE FROM comments WHERE id = ?', [comment_id], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 댓글 삭제중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 졸업요건 생성
app.post('/admin/graduation-requirements', authenticateToken, (req, res) => {
  // year(기수),type(학생 유형),dk_score(동국 소양 졸업학점),cm_score(공통 기초교육 학점),sub_score(계열 기초교육 학점),liberal_score(교양교육 학점),single_score(단수전공 학점),total_score(총 졸업학점)
  const { year, type, dk_score, cm_score, sub_score, liberal_score, single_score, total_score } = req.body;
  // SQL 쿼리를 이용하여 졸업요건 생성
  tomysql.query('INSERT INTO GraduationRequire (year, type, dk_score, cm_score, sub_score, liberal_score, single_score, total_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [year, type, dk_score, cm_score, sub_score, liberal_score, single_score, total_score], (err, results) => {
    if (err) {
      console.error('[오류] 졸업요건 생성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 졸업요건 수정
app.put('/admin/graduation-requirements/:id', authenticateToken, (req, res) => {
  const { year, type, dk_score, cm_score, sub_score, liberal_score, single_score, total_score } = req.body;
  const { id } = req.params;
  // SQL 쿼리를 이용하여 졸업요건 수정
  tomysql.query('UPDATE GraduationRequire SET year = ?, type = ?, dk_score = ?, cm_score = ?, sub_score = ?, liberal_score = ?, single_score = ?, total_score = ? WHERE id = ?', [year, type, dk_score, cm_score, sub_score, liberal_score, single_score, total_score, id], (err, results) => {
    if (err) {
      console.error('[오류] 졸업요건 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 졸업요건 삭제
app.delete('/admin/graduation-requirements/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 졸업요건 삭제
  tomysql.query('DELETE FROM GraduationRequire WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 졸업요건 삭제중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 졸업요건 목록 조회
app.get('/admin/graduation-requirements', authenticateToken, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  // SQL 쿼리를 이용하여 졸업요건 조회
  tomysql.query('SELECT * FROM GraduationRequire LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 졸업요건 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 졸업요건 조회
app.get('/admin/graduation-requirements/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 졸업요건 조회
  tomysql.query('SELECT * FROM GraduationRequire WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 졸업요건 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results[0]);
  });
});

// 필수과목 생성
app.post('/admin/required-courses', authenticateToken, (req, res) => {
  const { course_type, course_name } = req.body;
  // SQL 쿼리를 이용하여 필수과목 생성
  tomysql.query('INSERT INTO RCourse (course_type, course_name) VALUES (?, ?)', [course_type, course_name], (err, results) => {
    if (err) {
      console.error('[오류] 필수과목 생성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수과목 수정
app.put('/admin/required-courses/:id', authenticateToken, (req, res) => {
  const { course_type, course_name } = req.body;
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수과목 수정
  tomysql.query('UPDATE RCourse SET course_type = ?, course_name = ? WHERE id = ?', [course_type, course_name, id], (err, results) => {
    if (err) {
      console.error('[오류] 필수과목 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수과목 삭제
app.delete('/admin/required-courses/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수과목 삭제
  tomysql.query('DELETE FROM RCourse WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 필수과목 삭제중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수과목 목록 조회
app.get('/admin/required-courses', authenticateToken, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  // SQL 쿼리를 이용하여 필수과목 조회
  tomysql.query('SELECT * FROM RCourse LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 필수과목 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 필수과목 조회
app.get('/admin/required-courses/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수과목 조회
  tomysql.query('SELECT * FROM RCourse WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 필수과목 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results[0]);
  });
});

// 필수요건 집합 생성
app.post('/admin/requirement-course-relations', authenticateToken, (req, res) => {
  const { rid, course_id } = req.body;
  // SQL 쿼리를 이용하여 필수요건 집합 생성
  tomysql.query('INSERT INTO RCR (rid, course_id) VALUES (?, ?)', [rid, course_id], (err, results) => {
    if (err) {
      console.error('[오류] 필수요건 집합 생성중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수요건 집합 수정
app.put('/admin/requirement-course-relations/:id', authenticateToken, (req, res) => {
  const { rid, course_id } = req.body;
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수요건 집합 수정
  tomysql.query('UPDATE RCR SET rid = ?, course_id = ? WHERE id = ?', [rid, course_id, id], (err, results) => {
    if (err) {
      console.error('[오류] 필수요건 집합 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수요건 집합 삭제
app.delete('/admin/requirement-course-relations/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수요건 집합 삭제
  tomysql.query('DELETE FROM RCR WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 필수요건 집합 삭제중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// 필수요건 집합 목록 조회
app.get('/admin/requirement-course-relations', authenticateToken, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  // SQL 쿼리를 이용하여 필수요건 집합 조회
  tomysql.query('SELECT * FROM RCR LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 필수요건 집합 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 필수요건 집합 조회
app.get('/admin/requirement-course-relations/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  // SQL 쿼리를 이용하여 필수요건 집합 조회
  tomysql.query('SELECT * FROM RCR WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('[오류] 필수요건 집합 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results[0]);
  });
});

// 내정보 조회
app.get('/user/profile', authenticateToken, (req, res) => {
  // 사용자 정보 조회
  tomysql.query('SELECT * FROM Users WHERE email = ?', [req.email], (err, results) => {
    if (err) {
      console.error('[오류] 사용자 정보 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results[0]);
  });
});

// 내정보 수정
app.put('/user/profile', authenticateToken, (req, res) => {
  const { name, password, type, student_id, } = req.body;
  // 사용자 정보 수정
  tomysql.query('UPDATE Users SET name = ?, password = ?, type = ?, student_id = ? WHERE email = ?', [name, password, type, student_id, req.email], (err, results) => {
    if (err) {
      console.error('[오류] 사용자 정보 수정중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json({ success: true });
  });
});

// CORS 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 보안기능
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    req.email = user.email;
    next();
  });
}

// 서버 시작
app.listen(3000, () => {
  console.log('[서버시작] 포트 3000 에서 듣는 중...');
});