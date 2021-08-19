const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || getSessionToken === undefined)
        return false;

    return true;
}

const setSessionToken = token => {
    localStorage.setItem('sessionToken', token)
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken
}
