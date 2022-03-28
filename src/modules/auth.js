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

const setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
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

const getUser = () => {
    const roleSlug = JSON.parse(localStorage.getItem('user')).role.slug;
    const permissions = JSON.parse(JSON.parse(localStorage.getItem('user')).role.permissions);

    return {
        isAdmin: () => {
            if (roleSlug.startsWith("admin") || roleSlug.startsWith("stakehold"))
                return true;
            return false;
        },
        hasPermission: permission => {
            return permissions.includes(permission);
        },
        ...JSON.parse(localStorage.getItem('user'))
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    redirectIfSessionExpired,
    getUser,
    setUser
}
