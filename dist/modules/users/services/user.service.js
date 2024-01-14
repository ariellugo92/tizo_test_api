"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typedi_1 = require("typedi");
const user_repository_1 = require("../repositories/user.repository");
const crypto_service_1 = require("../../../utils/crypto.service");
let UserService = class UserService {
    constructor(userRepository, cryptoService) {
        this.userRepository = userRepository;
        this.cryptoService = cryptoService;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.get();
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getById(id);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    my(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = yield this.userRepository.getById(id);
                if (userLogged) {
                    return {
                        username: userLogged === null || userLogged === void 0 ? void 0 : userLogged.username,
                        role: userLogged === null || userLogged === void 0 ? void 0 : userLogged.role,
                    };
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptPassword = this.cryptoService.encrypt(data.password);
            const newUser = {
                username: data.username,
                role: data.role,
                password: encryptPassword,
            };
            try {
                yield this.userRepository.save(newUser);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.update(data, id);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id);
            if (!user)
                return false;
            try {
                yield this.userRepository.updateValue(id, { nameKey: 'status', value: false });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepositoty,
        crypto_service_1.CryptoService])
], UserService);
