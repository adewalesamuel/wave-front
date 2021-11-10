import { erase, get, postFormData } from './api';

const  ENPOINTS = {
    COLLECTED_DATA: 'collected_data',
};

const getAll = signal => {
    return get(ENPOINTS.COLLECTED_DATA, signal);
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.COLLECTED_DATA}/${id}`, signal);
}

const create = (payload, signal) => {
    return postFormData(ENPOINTS.COLLECTED_DATA, payload, signal);
}

const update = (id, payload, signal) => {
    return postFormData(`${ENPOINTS.COLLECTED_DATA}/${id}`, payload, signal);
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.COLLECTED_DATA}/${id}`, signal);
}

export const CollectedData = {
    getAll,
    getById,    
    create,
    update,
    destroy
}