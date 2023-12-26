const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');



router.get('/auth', auth, async (req, res, next) => {

  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  })
})


router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // 존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email }); // 하나의 row가 있는지 확인
    if (!user) {
      return res.status(400).send('Auth failed, email not found.');
    }
    // 비밀번호가 올바른 것인지 체크
    const isMatch = await user.comparePassword(req.body.password); // comparePassword : User.js에 생성한 메서드
    if (!isMatch) {
      return res.status(400).send('Wrong password');
    }
    const payload = {
      userId: user._id.toHexString(), // toHexString 하는 이유: 몽고db의 아이디는 오브젝트 형식으로 되어있기 때문
    };
    // token 생성 - sign 메서드: token을 생성하는 메서드 : 세번째 매개변수 옵션 (expiresIn는 유효시간)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});


router.post('/logout', auth, async (req, res, next) => {
  try {
    return res.sendStatus(200)
  } catch(error) {
    next(error)
  }
});

module.exports = router;
