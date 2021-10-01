import { erase, post, put, get } from './api';

const  ENPOINTS = {
    PROJECT: 'projects',
};

const getAll = signal => {
    return get(ENPOINTS.PROJECT, signal)
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.PROJECT}/${id}`, signal)
}

const create = (payload, signal) => {
    return post(ENPOINTS.PROJECT, payload, signal)
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.PROJECT}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return erase(`${ENPOINTS.PROJECT}/${id}`, signal)
}

export const Project = {
    getAll,
    getById,
    create,
    update,
    destroy
}