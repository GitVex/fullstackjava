// fetcher.ts
export const fetcher = (url: string, body?: any) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
