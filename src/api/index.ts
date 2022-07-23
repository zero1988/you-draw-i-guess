import config from '@/config'

export default class Api {
    static post(api: string, data: any): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data),
        })
    }

    static get(api: string): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return fetch(url)
    }

    static put(api: string, data: any): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data)

        })
    }

    static delete(api: string): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return fetch(url, {
            method: 'DELETE',
        })
    }
}