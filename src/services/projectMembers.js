import { erase, post} from './api';

const  ENPOINTS = {
    PROJECT_MEMBERS: 'project_members',
};

const create = (payload, signal) => {
    return post(ENPOINTS.PROJECT_MEMBERS, payload, signal)
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.PROJECT_MEMBERS}/${id}`, signal)
}

export const ProjectMember = {
    create,
    destroy
}