import { post } from './config';

export async function auditModuleLoaded () {
    return post('./api/audit/moduleLoaded');
}
