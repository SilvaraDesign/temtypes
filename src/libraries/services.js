const API_URL = 'https://temtem-api.mael.tech/api';

export function getWeaknesses() {
    const url = `${API_URL}/weaknesses`;
    return fetch(url);
}

export function getTypes() {
    const url = `${API_URL}/types`;
    return fetch(url);
}