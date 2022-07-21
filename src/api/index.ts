import axios from 'axios'

const host = 'http://localhost:8080/v1'

export default class Api {
    static post(api: string, data: any): Promise<any> {
        const url = `${host}${api}`
        return axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static get(api: string): Promise<any> {
        const url = `${host}${api}`
        return axios.get(url)
    }

    static put(api: string, data: any): Promise<any> {
        const url = `${host}${api}`
        return axios.put(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static delete(api: string): Promise<any> {
        const url = `${host}${api}`
        return axios.delete(url)
    }
}