import { Auth } from './layouts/auth';
import { Main } from './layouts/main';
import { Auth as AuthRoute } from './routes/auth';
import {Main as MainRoute} from './routes/main';
import { Login } from './forms/login';
import { ForgotPassword } from './forms/forgot-password';
import { ResetPassword } from './forms/reset-password';
import { ErrorMessageText } from './error-message-text';
import { SuccessMessageText } from './success-message-text';
import { Header } from './header';
import { MainMenu } from './main-menu';
import { PrivateRoute } from './private-route';

export const Components = {
    Layouts: {
        Auth,
        Main
    },
    Routes: {
        Auth: AuthRoute,
        Main: MainRoute
    },
    Forms: {
        Login,
        ForgotPassword,
        ResetPassword
    },
    ErrorMessageText,
    SuccessMessageText,
    PrivateRoute,
    Header,
    MainMenu
}