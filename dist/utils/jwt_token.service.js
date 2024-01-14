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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var JwtTokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_JWT_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
// TODO: mover a un archivo ENV
exports.SECRET_JWT_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMzMxNDMxOSwiaWF0IjoxNzAzMzE0MzE5fQ.WAOjSvwHij0J3qlDTq6opzfOb-1saiWb1Dry5qu_14M';
let JwtTokenService = JwtTokenService_1 = class JwtTokenService {
    constructor() {
        this.getToken = (token) => jsonwebtoken_1.default.verify(token, exports.SECRET_JWT_KEY);
    }
    generateToken(userId) {
        const payload = { userId };
        const token = jsonwebtoken_1.default.sign(payload, exports.SECRET_JWT_KEY, {
            expiresIn: '2 days',
        });
        return token;
    }
    static getTokenDecode(token) {
        const decodeToken = jsonwebtoken_1.default.decode(token, { complete: true });
        return decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.payload;
    }
    static authChecker(action) {
        try {
            const token = action.request.headers['authorization'];
            if (!token)
                return false;
            const jwtTokenService = new JwtTokenService_1();
            const verifyToken = jwtTokenService.getToken(token.split(' ')[1]);
            if (!verifyToken)
                return false;
            return true;
        }
        catch (error) {
            console.trace(error);
            return false;
        }
    }
};
JwtTokenService = JwtTokenService_1 = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], JwtTokenService);
exports.default = JwtTokenService;
