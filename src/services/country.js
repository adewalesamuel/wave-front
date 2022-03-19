import { erase, post, put, get } from './api';

const  ENPOINTS = {
    COUNTRY: 'countries',
};

const getAll = signal => {
    return get(ENPOINTS.COUNTRY, signal)
}

const getAllProjects = (id, signal) => {
    return get(`${ENPOINTS.COUNTRY}/${id}/projects`, signal);
}

const getAllUsers = (id, signal) => {
    return get(`${ENPOINTS.COUNTRY}/${id}/users`, signal);
}

const create = (payload, signal) => {
    return post(ENPOINTS.COUNTRY, payload, signal)
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.COUNTRY}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return erase(`${ENPOINTS.COUNTRY}/${id}`, signal)
}

export const Country = {
    getAll,
    create,
    update,
    destroy,
    getAllProjects,
    getAllUsers
}