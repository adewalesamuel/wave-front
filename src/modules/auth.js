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
    localStorage.removeItem('user');
}

const redirectIfSessionExpired = (err, history) => {
    if (!err) return;
    
    if (err.status && err.status === "Token is Expired") {
        removeSessionToken();
        history.push('/auth/login');
    }
}

const getUser = () => {
    if (!isLoggedIn()) return {isAdmin: () => false, hasPermission: permission => false};

    const userData = JSON.parse(localStorage.getItem('user')) ?? null;
    const userRole = userData ? userData.role : null;
    const roleSlug = userRole ? userRole.slug : '';
    const permissions = userRole ? userRole.permissions : [];

    return {
        isAdmin: () => {
            if (roleSlug.startsWith("admin") || roleSlug.startsWith("stakehold"))
                return true;
            return false;
        },
        hasPermission: permission => {
            return permissions.includes(permission);
        },
        ...userData
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
