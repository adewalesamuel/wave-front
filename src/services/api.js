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

export const get = (endpoint, signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`, {
            headers:HEADERS,
            signal
        })
        .then(response => {
            if (!response.ok)
               return reject(response);

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => reject(err))
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
            if (!response.ok)
               return reject(response);

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => reject(err))
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
            if (!response.ok)
               return reject(response);

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => reject(err))
    })
}

export const erase = (endpoint, payload="", signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ROOT_PATH}/${endpoint}`,
        {
            method:"delete", 
            headers:HEADERS, 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok)
               return reject(response);

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => reject(err))
    })
}
