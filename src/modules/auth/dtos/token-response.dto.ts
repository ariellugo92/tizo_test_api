export interface TokenResponseDto {
    token?: string | null,
    username?: string,
    role?: string,
    success: boolean,
}