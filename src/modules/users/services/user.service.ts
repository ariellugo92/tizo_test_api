import { Service } from "typedi";
import { UserRepositoty } from "../repositories/user.repository";
import { UserSaveDto } from "../dtos/user-save.dto";
import { UserModel } from '../domain/user.model';
import { CryptoService } from '../../../utils/crypto.service';
import { UserUpdateDto } from "../dtos/user-update.dto";

@Service()
export class UserService {
    constructor(
        private readonly userRepository: UserRepositoty,
        private readonly cryptoService: CryptoService,
    ) {}

    async getAll(): Promise<UserModel[]> {
        try {
            return await this.userRepository.get();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getById(id: string): Promise<UserModel | null> {
        try {
            return await this.userRepository.getById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async my(id: string): Promise<Partial<UserModel>| null> {
        try {
            const userLogged = await this.userRepository.getById(id);
            
            if (userLogged) {
                return {
                    username: userLogged?.username,
                    role: userLogged?.role,
                };
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async save(data: UserSaveDto): Promise<boolean> {
        const encryptPassword = this.cryptoService.encrypt(data.password);

        const newUser: UserModel = {
            username: data.username,
            role: data.role,
            password: encryptPassword,
        };
        
        try {
            await this.userRepository.save(newUser);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async update(data: UserUpdateDto, id: string): Promise<boolean> {
        try {
            await this.userRepository.update(data, id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async delete(id: string): Promise<boolean> {
        const user = await this.userRepository.getById(id);

        if (!user) return false;

        try {
            await this.userRepository.updateValue(id, {nameKey: 'status', value: false});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
