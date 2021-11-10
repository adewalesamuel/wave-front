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
import { Indicator } from "./indicator";
import { IndicatorDetails as  IndicatorDetailsIndex} from "./indicatorDetails";
import { IndicatorEdit } from "./indicatorEdit";
import { IndicatorDisaggregation } from "./indicatorDisaggregation";
import { CollectedData } from "./collectedData";
import { Dashboard } from "./dashbaord";

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
    Indicator,
    IndicatorDetails: {
        Index: IndicatorDetailsIndex,
        IndicatorEdit,
        IndicatorDisaggregation
    },
    CollectedData,
    Dashboard
}