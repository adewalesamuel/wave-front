import { erase, post, put, get } from './api';

const  ENPOINTS = {
    USER: 'users',
};

const getAll = signal => {
    return get(ENPOINTS.USER, signal)
}

const create = (payload, signal) => {
    return post(ENPOINTS.USER, payload, signal)
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.USER}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return erase(`${ENPOINTS.USER}/${id}`, signal)
}

export const User = {
    getAll,
    create,
    update,
    destroy
}