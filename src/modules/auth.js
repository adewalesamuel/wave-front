const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || !getSessionToken())
        return false;

    return true;
}

const setSessionToken = token => {
    localStorage.setItem('sessionToken', token)
}

const removeSessionToken = () => {
    localStorage.removeItem('sessionToken');
}

const redirectIfSessionExpired = (err, history) => {
    if (!err) return;
    
    if (err.status && err.status === "Token is Expired") {
        removeSessionToken();
        history.push('/auth/login');
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    redirectIfSessionExpired
}
