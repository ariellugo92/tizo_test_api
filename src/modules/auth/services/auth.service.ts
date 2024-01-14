import { Service } from "typedi";
import { AuthLoginDto } from "../dtos/auth-login.dto";
import { TokenResponseDto } from "../dtos/token-response.dto";
import { UserRepositoty } from '../../users/repositories/user.repository';
import { CryptoService } from '../../../utils/crypto.service';
import JwtTokenService from "../../../utils/jwt_token.service";
import { AuthRegisterDto } from '../dtos/auth-register.dto';
import { UserModel } from "../../users/domain/user.model";

@Service()
export class AuthService {
    constructor(
        private readonly userRepositoty: UserRepositoty,
        private readonly cryptoService: CryptoService,
        private readonly jwtTokenService: JwtTokenService,
    ) {}

    async validateLogin(data: AuthLoginDto): Promise<TokenResponseDto> {
        try {
            const userByUsername = await this.userRepositoty.getUserByUsername(data.username);
            if (userByUsername && userByUsername.status) {
                const compareHash = this.cryptoService.compareHash(userByUsername.password, data.password);
                if (compareHash) {
                    const token = this.jwtTokenService.generateToken(userByUsername._id ?? '');
                    return {token, success: true, username: userByUsername.username, role: userByUsername?.role};
                }

                return {token: null, success: false};
            }

            return {token: null, success: false};
        } catch (error) {
            console.error(error);
            return {token: null, success: false};
        }
    }

    async registerUser(data: AuthRegisterDto): Promise<boolean> {
        const encryptPassword = this.cryptoService.encrypt(data.password);

        const newUser: UserModel = {
            username: data.username,
            password: encryptPassword,
        };

        try {
            await this.userRepositoty.save(newUser);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}