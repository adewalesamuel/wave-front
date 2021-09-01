import { erase, post, put, get } from './api';

const  ENPOINTS = {
    ROLE: 'roles',
};

const getAll = signal => {
    return get(ENPOINTS.ROLE, signal)
}

const create = (payload, signal) => {
    return post(ENPOINTS.ROLE, payload, signal)
}

const update = (payload, signal) => {
    return put(ENPOINTS.ROLE, payload, signal)
}
const destroy = (payload, signal) => {
    return erase(ENPOINTS.ROLE, payload, signal)
}

export const Role = {
    getAll,
    create,
    update,
    destroy
}