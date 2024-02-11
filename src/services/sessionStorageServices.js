export const getSessionDataJson = (key) => {
    const data = JSON.parse(sessionStorage.getItem(key));
    return data;
};

export const removeSessionData = (key) => {
    sessionStorage.removeItem(key);
}

export const setSessionData = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const removeAllSessionData = () => {
    sessionStorage.clear();
}