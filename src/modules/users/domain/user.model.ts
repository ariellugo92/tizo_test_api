export interface UserModel {
    _id?: string,
    username: string,
    role?: 'admin' | 'user',
    password: string,
    status?: boolean,
}