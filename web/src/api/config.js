const cfg = {
    credentials: 'include'
};

const context = document.location.pathname.replace(/\/?$/, '/');
const baseUrl = new URL(context, document.location.origin);

function resolveUrl (url) {
    return new URL(url, baseUrl).href;
}

export function get (url) {
    return fetch(resolveUrl(url), {
        ...cfg,
        method: 'GET'
    });
}

export function post (url, data) {
    return fetch(resolveUrl(url), {
        ...cfg,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
