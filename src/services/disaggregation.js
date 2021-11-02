import { erase, post, put, get } from './api';

const  ENPOINTS = {
    DISAGGREGATION: 'disaggregations',
};

const getAll = signal => {
    return get(ENPOINTS.DISAGGREGATION, signal);
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.DISAGGREGATION}/${id}`, signal);
}

const create = (payload, signal) => {
    return post(ENPOINTS.DISAGGREGATION, payload, signal);
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.DISAGGREGATION}/${id}`, payload, signal);
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.DISAGGREGATION}/${id}`, signal);
}

export const Disaggregation = {
    getAll,
    getById,
    create,
    update,
    destroy
}