export interface UserSaveDto {
    username: string,
    role: 'admin' | 'user',
    password: string,
}