import { erase, post, put, get } from './api';

const  ENPOINTS = {
    INDICATOR: 'indicators',
};

const getAll = signal => {
    return get(ENPOINTS.INDICATOR, signal);
}

const getAllDisaggregations = (id, signal) => {
    return get(`${ENPOINTS.INDICATOR}/${id}/disaggregations`, signal);
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.INDICATOR}/${id}`, signal);
}

const create = (payload, signal) => {
    return post(ENPOINTS.INDICATOR, payload, signal);
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.INDICATOR}/${id}`, payload, signal);
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.INDICATOR}/${id}`, signal);
}

export const Indicator = {
    getAll,
    getAllDisaggregations,
    getById,
    create,
    update,
    destroy
}