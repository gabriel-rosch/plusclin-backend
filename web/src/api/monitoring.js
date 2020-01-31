import { post, get } from './config';

export async function create (payload) {
    return post('./api/monitoring', {
        ...payload
    });
}

export async function listUserPhones () {
    return get('./api/monitoring/user/phone');
}

export async function listDomains () {
    return get('./api/monitoring/domains');
}
export async function listTwitterTerms () {
    return get('./api/monitoring/twitter/terms');
}
