import { Login } from "./auth-login";
import { ForgotPassword } from "./auth-forgot_password";
import { ResetPassword } from "./auth-reset_password";
import { Home } from "./home";
import { Header } from "./header";

export const Controllers = {
    Auth: {
        Login,
        ForgotPassword,
        ResetPassword
    },
    Header,
    Home
}