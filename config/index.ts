export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";
export const BACK_END_DEFAULT_URL = process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL || "http://localhost:1337";
export const NEXT_DEFAULT_URL = process.env.NEXT_PUBLIC_DEFAULT_URL || "http://localhost:3000";
export const NEXT_API_URL = process.env.NEXT_PUBLIC_FRONTEND_API_URL || "http://localhost:3000/api";
export const DEBUG_CONSOLE_ON = process.env.DEBUG_CONSOLE_ON || true;

export const INVALID_LOGIN_PARAMETERS = "メールとパスワードを確認してください。";
export const UNAUTHORIZED_ACCOUNT = "ログイン権限がありません。管理者に問い合わせしてください。";