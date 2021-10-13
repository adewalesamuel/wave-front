import { erase, post, put, get } from './api';

const  ENPOINTS = {
    ACTIVITY: 'activities',
};

const getAll = signal => {
    return get(ENPOINTS.ACTIVITY, signal);
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.ACTIVITY}/${id}`, signal);
}

const create = (payload, signal) => {
    return post(ENPOINTS.ACTIVITY, payload, signal);
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.ACTIVITY}/${id}`, payload, signal);
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.ACTIVITY}/${id}`, signal);
}

export const Activity = {
    getAll,
    getById,
    create,
    update,
    destroy
}