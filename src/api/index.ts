import axios from 'axios'
import config from '@/config'

export default class Api {
    static post(api: string, data: any): Promise<any> {
        const url = `${config.httpUrl}${api}`

        return axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static get(api: string): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return axios.get(url)
    }

    static put(api: string, data: any): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return axios.put(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static delete(api: string): Promise<any> {
        const url = `${config.httpUrl}${api}`
        return axios.delete(url)
    }
}