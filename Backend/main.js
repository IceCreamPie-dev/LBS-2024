const mysql = require('mysql2');
const express = require('express');
const app = express();
const exel = require('xlsx');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const cors = require('cors');

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
app.use(express.json());
// 로그인 요청
app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  // 이메일과 비밀번호로 사용자 조회
  tomysql.query('SELECT * FROM Users WHERE email = ? AND pwd = ?', [email, password], (err, results) => {
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
    const token = jwt.sign({ email, name: results[0].name, role: results[0].role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

app.get('/checklogin', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: '로그인이 필요합니다.' });
    return;
  }
  // JWT 토큰 검증
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }
    res.json({ email: decoded.email, name: decoded.name });
  });
});

// 회원가입 요청 - 이름, 이메일, 비밀번호
app.post('/register', (req, res) => {
  const { email, pwd, name, studentId, type } = req.body;
  // 사용자 생성
  tomysql.query('INSERT INTO Users (email, pwd, name, student_id, role) VALUES (?, ?, ?, ?, ?)', [email, pwd, name, studentId, type], (err, results) => {
    // email이 중복되는 경우 에러 발생 400 에러
    if (err) {
      console.error('[오류] 사용자 생성중 오류 발생:', err);
      res.status(409).json({ error: '이미 사용중인 이메일입니다.' });
      return;
    }
    // 성공 응답 및 토큰 전송
    const token = jwt.sign({ email, name, role: type }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token });
  });
});

// 성적 계산 요청 프론트에서 xlsx 파일과, year(입학년도), type(학생 유형)을 받음
app.post('/calgradexlsx', upload.single('file'), (req, res) => {
  // 엑셀 파일을 읽어서 데이터를 추출
  const workbook = exel.read(req.file.buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = exel.utils.sheet_to_json(sheet, { header: 'A' });
  const { year, type } = req.body;

  // 엑셀에서 학생의 동국 소양 현재 학점 추출 "이수구분"이 소양인 학점을 추출 등급이 F가 아닌것만 추출 재수강 구분이 OLD재수강이 아닌 학점을 추출
  const std_dk_score = data.filter((row) => row['E'] === '소양' && row['L'] !== 'F' && row['N'] !== 'OLD재수강').reduce((acc, row) => acc + row['K'], 0);
  // 학생의 공통 교육
  const std_cm_score = data.filter((row) => row['E'] === '공교'&& row['L'] !== 'F' && row['N'] !== 'OLD재수강').reduce((acc, row) => acc + row['K'], 0);
  // 학생의 계열 교육
  const std_sub_score = data.filter((row) => row['E'] === '학기'&& row['L'] !== 'F' && row['N'] !== 'OLD재수강').reduce((acc, row) => acc + row['K'], 0);
  // 학생의 교양
  const std_liberal_score = data.filter((row) => row['E'] === '교양'&& row['L'] !== 'F' && row['N'] !== 'OLD재수강').reduce((acc, row) => acc + row['K'], 0);
  // 학생의 단수 전공
  const std_single_score = data.filter((row) => row['E'] === '전공'&& row['L'] !== 'F' && row['N'] !== 'OLD재수강').reduce((acc, row) => acc + row['K'], 0);
  // 학생의 총 점수 acc는 2번째 줄부터
  const std_total_score = data.filter((row) => row['L'] !== 'F' && row['N'] !== 'OLD재수강' && row['K'] !== '학점').reduce((acc, row) => acc + row['K'], 0);

  // 학생의 1영역 ~ 4영역 점수 추출
  const std_lib_1 = data.filter((row) => row['F'] === '제1영역:문학/역사/철학').reduce((acc, row) => acc + row['K'], 0);
  const std_lib_2 = data.filter((row) => row['F'] === '제2영역:정치/경제/사회/심리').reduce((acc, row) => acc + row['K'], 0);
  const std_lib_3 = data.filter((row) => row['F'] === '제3영역:과학/기술/생명').reduce((acc, row) => acc + row['K'], 0);
  const std_lib_4 = data.filter((row) => row['F'] === '제4영역:예술/문화').reduce((acc, row) => acc + row['K'], 0);

  // 학생이 들은 모든 강의의 이름 추출 row N에 OLD재수강이 아닌것, F가 아닌것 학점이 0이 아닌것
  const std_all_title = data.filter((row) => row['N'] !== 'OLD재수강' && row['L'] !== 'F' && row['K'] !== 0).map((row) => row['I']);
  // 사용할 변수들 선언
  // DB에서 졸업 요건을 조회
  tomysql.query('SELECT * FROM GraduationRequire WHERE year = ? AND type = ?', [year, type], (err, results) => {
    // type과 year로 조회한 결과가 없다면 졸업요건이 없다는 뜻이므로 바로 반환
    if (err) {
      console.error('[오류] 졸업요건 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    if (results.length === 0) {
      console.error('[오류] 졸업요건 조회중 오류 발생:', err);
      res.status(500).json({ error: '해당 요건이 없습니다.' });
      return;
    }

    // 졸업 요건을 조회한 결과를 저장
    const graduationRequire = results[0];
    // DB의 졸업 요건을 데이터를 저장
    const rq_dk_score = graduationRequire.dk_score; // 동국 소양 졸업학점
    const rq_cm_score = graduationRequire.cm_score; // 공통 기초교육 학점
    const rq_sub_score = graduationRequire.sub_score; // 계열 기초교육 학점
    const rq_liberal_score = graduationRequire.liberal_score; // 교양교육 학점
    const rq_single_score = graduationRequire.single_score; // 단수전공 학점
    const rq_total_score = graduationRequire.total_score; // 총 졸업학점
    const rq_lib_1 = graduationRequire.lib_1; // 제1영역 필요 점수
    const rq_lib_2 = graduationRequire.lib_2; // 제2영역 필요 점수
    const rq_lib_3 = graduationRequire.lib_3; // 제3영역 필요 점수
    const rq_lib_4 = graduationRequire.lib_4; // 제4영역 필요 점수
    
    // 졸업 요건의 id를 이용하여 필수과목을 조회
    tomysql.query('SELECT * FROM RCR WHERE rid = ?', [graduationRequire.rid], (err, results) => {
      if (err) {
        console.error('[오류] 졸업요건 조회중 오류 발생:', err);
        res.status(500).json({ error: '내부 서버 오류' });
        return;
      }
      const requiredCourses = results.map((row) => row.course_id);

      // requiredCourses 에 데이터가 없다면 필수과목이 없다는 뜻이므로 바로 반환
      if (requiredCourses.length == 0)
        return;
      else {
        // 필수과목 데이터를 조회 rid 와 course_id 를 이용
        tomysql.query('SELECT * FROM RCourse WHERE course_id IN (?)', [requiredCourses], (err, results) =>{
          if (err) {
            console.error('[오류] 필수과목 조회중 오류 발생:', err);
            res.status(500).json({ error: '내부 서버 오류' });
            return;
          }
          const requiredCourses = results;

          // requiredCourses에서 데이터를 정제 course_type별로 리스트로 묶어서 학생의 엑셀과 비교할 것임
          // 전문, 소양, 공교, 학기
          const rq_professional = requiredCourses.filter((row) => row.course_type === '전문').map((row) => row.course_name);
          const rq_soyang = requiredCourses.filter((row) => row.course_type === '소양').map((row) => row.course_name);
          const rq_common = requiredCourses.filter((row) => row.course_type === '공교').map((row) => row.course_name);
          const rq_semester = requiredCourses.filter((row) => row.course_type === '학기').map((row) => row.course_name);

          // std_all_title에 있는 강의명과 rq_professional, rq_soyang, rq_common, rq_semester을 비교하여 각각의 강의를 들었는지 확인 후 들었으면 ture, 안들었으면 false 이름과 같이 저장
          // 이름, true or false 형식
          const std_professional = rq_professional.map((row) => [row, std_all_title.includes(row)]);
          const std_soyang = rq_soyang.map((row) => [row, std_all_title.includes(row)]);
          const std_common = rq_common.map((row) => [row, std_all_title.includes(row)]);
          const std_semester = rq_semester.map((row) => [row, std_all_title.includes(row)]);

          // 결과를 반환
          // 졸업 요건 학점들, 현재 학점들, 영역별 이수여부를 반환
          res.json({
            success: true,
            data: {
            std_professional, std_soyang, std_common, std_semester,
            std_dk_score, std_cm_score, std_sub_score, std_liberal_score, std_single_score, std_total_score,
            rq_dk_score, rq_cm_score, rq_sub_score, rq_liberal_score, rq_single_score, rq_total_score,
            rq_lib_1, rq_lib_2, rq_lib_3, rq_lib_4, std_lib_1, std_lib_2, std_lib_3, std_lib_4
            }
          });
        });
      }
    });
  });
});

// QnA게시물 상세 조회
app.get('/board/QnA/:postId', (req, res) => {
  const postId = req.params.postId;

  tomysql.query('SELECT * FROM QnA WHERE qid = ?', [postId], (err, results) => {
    if (err) {
      console.error('[오류] 게시글 조회 중 오류 발생:', err);
      res.status(500).json({ error: '게시글 조회 중 오류가 발생했습니다.' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });
      return;
    }

    res.json(results[0]);
  });
});

// QnA게시물 생성
app.post('/board/QnA', (req, res) => {
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

// QnA게시물 수정
app.put('/board/:id', (req, res) => {
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

// QnA게시물 삭제
app.delete('/board/QnA/:id', (req, res) => {
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

// QnA 게시물 목록 조회 
app.get('/board/QnA', (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const offset = (page - 1) * limit;

  // QnA게시물 목록 조회
  tomysql.query(`SELECT qid, title, created_at FROM QnA ORDER BY created_at DESC LIMIT ? OFFSET ?`, [ +limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// QnA 게시물 댓글 조회
app.get('/board/:board_type/:post_id/comments', (req, res) => {
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

// QnA 게시물 댓글 생성
app.post('/board/:board_type/:post_id/comments', (req, res) => {
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

// QnA 게시물 댓글 수정
app.put('/board/:board_type/:post_id/comments/:comment_id', (req, res) => {
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

// QnA 게시물 댓글 삭제
app.delete('/board/:board_type/:post_id/comments/:comment_id', (req, res) => {
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

// 공지 게시물 목록 조회
app.get('/board/info', (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;
  // 공지 게시물 목록 조회
  tomysql.query('SELECT iid, title, created_at FROM Info ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
    if (err) {
      console.error('[오류] 게시물 조회중 오류 발생:', err);
      res.status(500).json({ error: '내부 서버 오류' });
      return;
    }
    res.json(results);
  });
});

// 공지 게시물 상세 조회

// 공지 게시물 생성

// 공지 게시물 수정

// 공지 게시물 삭제

// 졸업요건 생성
app.post('/admin/graduation-requirements', (req, res) => {
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
app.put('/admin/graduation-requirements/:id', (req, res) => {
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
app.delete('/admin/graduation-requirements/:id', (req, res) => {
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
app.get('/admin/graduation-requirements', (req, res) => {
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
app.get('/admin/graduation-requirements/:id', (req, res) => {
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
app.post('/admin/required-courses', (req, res) => {
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
app.put('/admin/required-courses/:id', (req, res) => {
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
app.delete('/admin/required-courses/:id', (req, res) => {
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
app.get('/admin/required-courses', (req, res) => {
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
app.get('/admin/required-courses/:id', (req, res) => {
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
app.post('/admin/requirement-course-relations', (req, res) => {
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
app.put('/admin/requirement-course-relations/:id', (req, res) => {
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
app.delete('/admin/requirement-course-relations/:id', (req, res) => {
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
app.get('/admin/requirement-course-relations', (req, res) => {
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
app.get('/admin/requirement-course-relations/:id', (req, res) => {
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
app.get('/user/profile', (req, res) => {
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
app.put('/user/profile', (req, res) => {
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
app.use(cors({
  origin: '*',
}));

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