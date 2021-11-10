import { erase, post, put, get } from './api';

const  ENPOINTS = {
    GRAPH: 'graphs',
};

const getAllByProject = (id, signal) => {
    return get(`${ENPOINTS.GRAPH}?project_id=${id}`, signal);
}

const getById = (id, signal) => {
    return get(`${ENPOINTS.GRAPH}/${id}`, signal);
}

const create = (payload, signal) => {
    return post(ENPOINTS.GRAPH, payload, signal);
}

const update = (id, payload, signal) => {
    return put(`${ENPOINTS.GRAPH}/${id}`, payload, signal);
}

const destroy = (id, signal) => {
    return erase(`${ENPOINTS.GRAPH}/${id}`, signal);
}

export const Graph = {
    getAllByProject,    
    getById,
    create,
    update,
    destroy
}