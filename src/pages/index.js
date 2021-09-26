import { Login } from "./auth-login";
import { ForgotPassword } from "./auth-forgot-password";
import { ResetPassword } from "./auth-reset_password";
import { Root as RootPage} from "./Root";
import { Home } from "./home";
import { User } from "./user";
import { Project } from "./project";

export const Pages = {
    Root: RootPage,
    Auth: {
        Login,
        ForgotPassword,
        ResetPassword
    },
    Home,
    User,
    Project
};