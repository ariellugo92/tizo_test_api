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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typedi_1 = require("typedi");
const user_repository_1 = require("../../users/repositories/user.repository");
const crypto_service_1 = require("../../../utils/crypto.service");
const jwt_token_service_1 = __importDefault(require("../../../utils/jwt_token.service"));
let AuthService = class AuthService {
    constructor(userRepositoty, cryptoService, jwtTokenService) {
        this.userRepositoty = userRepositoty;
        this.cryptoService = cryptoService;
        this.jwtTokenService = jwtTokenService;
    }
    validateLogin(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userByUsername = yield this.userRepositoty.getUserByUsername(data.username);
                if (userByUsername && userByUsername.status) {
                    const compareHash = this.cryptoService.compareHash(userByUsername.password, data.password);
                    if (compareHash) {
                        const token = this.jwtTokenService.generateToken((_a = userByUsername._id) !== null && _a !== void 0 ? _a : '');
                        return { token, success: true, username: userByUsername.username, role: userByUsername === null || userByUsername === void 0 ? void 0 : userByUsername.role };
                    }
                    return { token: null, success: false };
                }
                return { token: null, success: false };
            }
            catch (error) {
                console.error(error);
                return { token: null, success: false };
            }
        });
    }
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptPassword = this.cryptoService.encrypt(data.password);
            const newUser = {
                username: data.username,
                password: encryptPassword,
            };
            try {
                yield this.userRepositoty.save(newUser);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepositoty,
        crypto_service_1.CryptoService,
        jwt_token_service_1.default])
], AuthService);
