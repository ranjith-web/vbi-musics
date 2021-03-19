import API from './API';

export const getAlbum = async (id) => {
    try{
        const data = await API.get(`/albums`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const getAllSongs = async () => {
    try{
        const data = await API.get("/photos");
        return data;
    } catch (err) {
        throw err;
    }
}

export const getSongsWithLimit = async (limit) => {
    try{
        const data = await API.get(`/photos?_limit=${limit}`);
        return data;
    } catch (err) {
        throw err;
    }
}

// setter
export const setCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// getter
export const getCache = (key) => {
    const cachedData = JSON.parse(localStorage.getItem(key));
    return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
}

// remove
export const removeCache = (key) => {
    localStorage.removeItem(key);
}

// remove all
export const removeAllCache = () => {
    localStorage.clear();
}