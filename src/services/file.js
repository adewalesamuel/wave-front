import { postFormData } from './api';

const  ENPOINTS = {
    File: 'upload',
};

const store = (payload, signal) => {
    return postFormData(ENPOINTS.File, payload, signal)
}

export const File = {
    store
}