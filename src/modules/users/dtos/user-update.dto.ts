export interface UserUpdateDto {
    username: string,
    role: 'admin' | 'user',
}