import { get } from './api';

const  ENPOINTS = {
    PERMISSION: 'permissions',
};

const getAll = signal => {
    return get(ENPOINTS.PERMISSION, signal)
}

export const Permission = {
    getAll
}