import { Auth } from './layouts/auth';
import { Auth as AuthRoute } from './routes/auth';
import { Login } from './forms/login';
import { ForgotPassword } from './forms/forgot-password';
import { ResetPassword } from './forms/reset-password';
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
        ForgotPassword,
        ResetPassword
    },
    ErrorMessageText,
    SuccessMessageText
}