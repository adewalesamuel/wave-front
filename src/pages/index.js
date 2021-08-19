import { Login } from "./auth-login";
import { ForgotPassword } from "./auth-forgot-password";
import { Root as RootPage} from "./Root";

export const Pages = {
    Root: RootPage,
    Auth: {
        Login,
        ForgotPassword,
    }
};