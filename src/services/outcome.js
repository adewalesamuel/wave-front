import { erase, post, put, get } from './api';

const  ENPOINTS = {
    COUNTRY: 'outcomes',
};

const getAll = signal => {
    return get(ENPOINTS.COUNTRY, signal)
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

export const Outcome = {
    getAll,
    create,
    update,
    destroy
}