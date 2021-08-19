import { Auth } from './layouts/auth';
import { Auth as AuthRoute } from './routes/auth';
import { Login } from './forms/login';
import { ForgotPassword } from './forms/forgot-password';
import './../app-assets/css/pages/authentication.css';
import { ErrorMessageText } from './error-message-text';
import { SuccessMessageText } from './success-message-text';

export const Components = {
    Layouts: {
        Auth,
    },
    Routes: {
        Auth: AuthRoute
    },
    Forms: {
        Login,
        ForgotPassword
    },
    ErrorMessageText,
    SuccessMessageText
}