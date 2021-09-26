import { erase, post, put, get } from './api';

const  ENPOINTS = {
    PROJECT: 'projects',
};

const getAll = signal => {
    return get(ENPOINTS.PROJECT, signal)
}

const create = (payload, signal) => {
    return post(ENPOINTS.PROJECT, payload, signal)
}

const update = (payload, signal) => {
    return put(ENPOINTS.PROJECT, payload, signal)
}
const destroy = (payload, signal) => {
    return erase(ENPOINTS.PROJECT, payload, signal)
}

export const Project = {
    getAll,
    create,
    update,
    destroy
}