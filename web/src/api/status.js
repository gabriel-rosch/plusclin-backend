import { get } from './config';

export async function getStatus (searchId) {
    return get(`./api/search/${searchId}/status`);
}
