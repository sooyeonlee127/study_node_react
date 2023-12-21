import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from "./thunkFunctions";
import { toast } from 'react-toastify';
const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder // case들을 등록
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info('회원가입을 성공했습니다.');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.error = '실패'
        toast.error('회원가입에 실패하였습니다.');
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userData = action.payload
        state.isAuth = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.error = '실패'
        toast.error('로그인에 실패하였습니다.');
      })
  },
});

export default userSlice.reducer;
