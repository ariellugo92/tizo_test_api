import { Service } from "typedi";
import SHA256 from "crypto-js/SHA256";
import CryptoJS from "crypto-js";

@Service()
export class CryptoService {
    keyPassword = '1234';
    constructor() {}

    // encrypt(value: string): string {
    //     return SHA256(value).toString(CryptoJS.enc.Utf8);
    // }

    encrypt(value: string) {
        let encJson = CryptoJS.SHA256(JSON.stringify(value)).toString();
        let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
        return encData
    }

    compareHash(hash: string, value: string): boolean {
        const encryptValue = CryptoJS.SHA256(JSON.stringify(value)).toString();
        const encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptValue));

        return (encData === hash);
    }
}