import { post } from './api';

const  ENPOINTS = {
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password'
};

const login = (payload, signal) => {
    return post(ENPOINTS.LOGIN, payload, signal)
}

const forgotPassword = (payload, signal) => {
    return post(ENPOINTS.FORGOT_PASSWORD, payload, signal)
}

const resetPassword = (payload, signal) => {
    return post(ENPOINTS.RESET_PASSWORD, payload, signal)
}
export const Auth = {
    login,
    forgotPassword,
    resetPassword
}