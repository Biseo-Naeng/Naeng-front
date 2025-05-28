export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    statusCode: number;
    body: {
        accessToken: string;
        refreshToken: string;
    };
    message?: string;
}