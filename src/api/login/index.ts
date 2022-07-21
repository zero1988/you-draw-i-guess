import Api from '@/api'

export function login(userId: string, password: string): Promise<any> {
    return Api.post('/user/login', {
        userId,
        password
    })
}

export function register(userId: string, userName: string, password: string): Promise<any> {
    return Api.post('/user/register', {
        userId,
        userName,
        password
    })
}