import { Login } from "./auth-login";
import { ForgotPassword } from "./auth-forgot_password";
import { ResetPassword } from "./auth-reset_password";
import { Home } from "./home";
import { Header } from "./header";
import { User } from "./user";
import { Project } from "./project";
import { ProjectDetails as ProjectDetailsIndex } from "./projectDetails";
import { ProjectEdit } from "./projectEdit";
import { ProjectMembers } from "./projectMembers";
import { Activity } from "./activity";
import { ActivityDetails as ActivityDetailsIndex} from "./activityDetails";
import { ActivityEdit } from "./activityEdit";

export const Controllers = {
    Auth: {
        Login,
        ForgotPassword,
        ResetPassword
    },
    Header,
    Home,
    User,
    Project,
    ProjectDetails: {
        Index: ProjectDetailsIndex,
        ProjectEdit,
        ProjectMembers
    },
    Activity,
    ActivityDetails: {
        Index: ActivityDetailsIndex,
        ActivityEdit
    },
}