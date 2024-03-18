const mysql = require('mysql2');
const express = require('express');
const app = express();

// 데이터 베이스에 연결
// 원래 이러한 정보는 환경 변수로 설정해야 합니다. ex) process.env.DB_HOST
// 이 예제에서는 편의상 하드코딩하였습니다.
const connection = mysql.createConnection({
  host: 'lbs',
  user: 'root',
  password: 'lbs1234!',
  database: 'lbs1234!'
});

// 데이터 베이스 연결 확인
connection.connect((err) => {
  if (err) {
    console.error('[오류] 데이터 베이스에 연결하던 중 오류 발생:', err);
    return;
  }
  console.log('[연결됨] 데이터 베이스에 연결되었습니다.');
});

// 예제 요청 처리
app.get('/api/data', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT * FROM your_table', (err, results) => {
      if (err) {
        console.error('[오류] 쿼리 실행중 오류 발생:', err);
        res.status(500).json({ error: '내부 서버 오류' });
        return;
      }
      res.json(results);
    });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});