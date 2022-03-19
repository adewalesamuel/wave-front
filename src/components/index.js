import { Auth } from './layouts/auth';
import { Main } from './layouts/main';
import { Auth as AuthRoute } from './routes/auth';
import {Main as MainRoute} from './routes/main';
import { Login } from './forms/login';
import { ErrorMessageText } from './error-message-text';
import { SuccessMessageText } from './success-message-text';
import { Header } from './header';
import { MainMenu } from './main-menu';
import { PrivateRoute } from './private-route';
import { Table } from './table';
import { Modal } from './modal';
import { ForgotPassword } from './forms/forgot-password';
import { ResetPassword } from './forms/reset-password';
import { User } from './forms/user';
import { Role } from './forms/role';
import { Project } from './forms/project';
import { Activity } from './forms/activity';
import { Indicator } from './forms/indicator';
import { Disaggregation } from './forms/disaggregation';
import { CollectedData } from './forms/collectedData';
import { Graph } from './forms/graph';
import { Country } from './forms/country';
import { FilterForm } from './filter-form';

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
        ResetPassword,
        User,
        Role,
        Project,
        Activity,
        Indicator,
        Disaggregation,
        CollectedData,
        Graph,
        Country
    },
    ErrorMessageText,
    SuccessMessageText,
    PrivateRoute,
    Header,
    MainMenu,
    Table,
    Modal,
    FilterForm
}