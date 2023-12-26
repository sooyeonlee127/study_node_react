// nodejs의 진입점이 되는 파일
const express = require('express');

const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // env 사용
dotenv.config(); // env 사용

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('연결 완료'))
  .catch((err) => {
    console.log(err);
  });
app.use(cors()); // cors 미들웨어 사용
app.use(express.json()); // json 미들웨어 사용
app.get('/', (req, res, next) => {
  setImmediate(() => {
    next(new Error('it is an error')); // next로 감싸주지 않으면 비동기 에러일 경우 서버가 내려감
  });
  //   res.send('안녕하세요.');
});

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// 에러 처리기
app.use((error, req, res, next) => {
  res.status(err.status || 500); // 에러 코드가 있으면 그걸 보내고, 없으면 500을 보냄
  res.send(error.message || '서버에서 에러가 났습니다.');
});

// 1) 상대경로 지정
// app.use(express.static('uploads')); // 이 코드를 사용하여 ('폴더이름')이라는
// // 디렉토리에서 이미지, css 밎  javascript 파일을 제공함 => 상대경로

// => 더 나음
// 2) 절대경로 지정
const path = require('path');
app.use(express.static(path.join(__dirname, '../uploads'))); // src에서 한번 나간 뒤 uploads 찾는 형식

app.listen(port);
