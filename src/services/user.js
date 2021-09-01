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

const update = (payload, signal) => {
    return put(ENPOINTS.USER, payload, signal)
}
const destroy = (payload, signal) => {
    return erase(ENPOINTS.USER, payload, signal)
}

export const User = {
    getAll,
    create,
    update,
    destroy
}