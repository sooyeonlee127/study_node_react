
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
})

// pre 메서드 : save db 저장하기 전에 호출되도록 하는 부분 - 여기서 비밀번호 암호화 처리
userSchema.pre('save', async function (next) {
    let user = this; // user의 데이터들

    if (user.isModified('password')) { // password를 수정할 때만
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash; // 해시된 패스워드로 저장
    }
    next();
});
// comparePassword : 로그인한 비밀번호가 암호화된 비밀번호와 맞는지 확인
userSchema.methods.comparePassword = async function (plainPassword) { // plainPassword: 평문 패스워드
    let user = this; // user의 데이터들
    const match = await bcrypt.compare(plainPassword, user.password);
    return match;
}

// 스키마 밑에 선언되어야함.
const User = mongoose.model("User", userSchema);

module.exports = User;
