import { Modules } from "../modules";

const URL = 'http://127.0.0.1';
const PORT = '8000';
const API_URL = process.env.REACT_APP_API_URL ?? `${URL}:${PORT}`;
const ROOT_PATH  = '/api' 
const HEADERS = new Headers({
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive',
    'Authorization': `Bearer ${Modules.Auth.getSessionToken()}`
});
const FORMDATA_HEADERS = new Headers({
    'Accept': 'application/json',
    'Authorization': `Bearer ${Modules.Auth.getSessionToken()}`
});

export const get = (endpoint, signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`, {
            headers:HEADERS,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                 });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

export const post = (endpoint, payload="", signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`,
        {
            method:"post", 
            headers:HEADERS, 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                 });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}
export const postFormData = (endpoint, payload="", signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`,
        {
            method:"post", 
            headers:FORMDATA_HEADERS, 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                 });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

export const put = (endpoint, payload="", signal=new AbortController().signal) => {
   return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`,
        {
            method:"put", 
            headers:HEADERS, 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                 });
            } 

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

export const erase = (endpoint, signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`,
        {
            method:"delete", 
            headers:HEADERS, 
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                 });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const getResponseErrors = response => {
    return new Promise((resolve, reject) => {
        if (!response) reject(null);
        
        response.json().then(result => {
            let errorMessages = [];
            
            errorMessages.push(result.message);
    
            for (let error in result.errors) 
                errorMessages.push(result.errors[error]);

            resolve(errorMessages);
        });    
    })
}
