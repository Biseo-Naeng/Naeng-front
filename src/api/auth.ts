// api/auth.ts
//import axios from 'axios';
import { LoginRequest, LoginResponse } from "../interface/apidata.interface";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch('http://10.0.2.2:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('로그인 요청 실패');
    }

    return await response.json();
};
