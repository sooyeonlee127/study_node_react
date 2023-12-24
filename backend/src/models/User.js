// user 스키마 설정

const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User; // 다른 모듈에서 모델을 사용할 수 있도록 exports
