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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const typedi_1 = require("typedi");
const crypto_js_1 = __importDefault(require("crypto-js"));
let CryptoService = class CryptoService {
    constructor() {
        this.keyPassword = '1234';
    }
    // encrypt(value: string): string {
    //     return SHA256(value).toString(CryptoJS.enc.Utf8);
    // }
    encrypt(value) {
        let encJson = crypto_js_1.default.SHA256(JSON.stringify(value)).toString();
        let encData = crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(encJson));
        return encData;
    }
    compareHash(hash, value) {
        const encryptValue = crypto_js_1.default.SHA256(JSON.stringify(value)).toString();
        const encData = crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(encryptValue));
        return (encData === hash);
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CryptoService);
