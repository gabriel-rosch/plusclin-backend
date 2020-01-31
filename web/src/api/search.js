import { get, post } from './config';

export async function scheduleSearch (payload) {
    return post('./api/search/schedule', {
        ...payload
    });
}

export async function getMySearches () {
    return get('./api/search');
}

export async function retrieve (payload) {
    return post('./api/search/retrieve', {
        ...payload
    });
}

export async function retrieveDetail (entityId, locale) {
    return get(`./api/retrieve/${entityId}?locale=${locale}`);
}
