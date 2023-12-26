import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async(body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body
            )
            return response.data
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);

        }
    }

)

export const authUser = createAsyncThunk(
    "user/authUser",
    async(_, thunkAPI) => { // thunkAPI는 항상 두번째 매개변수이기 때문에 첫번째 매개변수가 없는 경우는 _ 이런식으로 비워두면 된다.
        try {
            const response = await axiosInstance.get(
                `/users/auth`,
            )
            return response.data
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);

        }
    }

)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/logout`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)