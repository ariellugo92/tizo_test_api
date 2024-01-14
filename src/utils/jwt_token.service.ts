import jwt, { JwtPayload } from "jsonwebtoken";
import { Action } from "routing-controllers";
import { Service } from "typedi";

// TODO: mover a un archivo ENV
export const SECRET_JWT_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMzMxNDMxOSwiaWF0IjoxNzAzMzE0MzE5fQ.WAOjSvwHij0J3qlDTq6opzfOb-1saiWb1Dry5qu_14M';

@Service()
export default class JwtTokenService {
    constructor() {}

    generateToken(userId: string): string {
        const payload = {userId};
        const token = jwt.sign(payload, SECRET_JWT_KEY, {
            expiresIn: '2 days',
        });
        return token;
    }

    getToken = (token: string): JwtPayload | string => jwt.verify(token, SECRET_JWT_KEY);

    static getTokenDecode(token: string): JwtPayload | string | undefined {
        const decodeToken = jwt.decode(token, {complete: true});
        return decodeToken?.payload;
    }

    static authChecker(action: Action): boolean {
        try {
            const token = action.request.headers['authorization'];
            if (!token) return false;
        
            const jwtTokenService = new JwtTokenService();
            const verifyToken = jwtTokenService.getToken(token.split(' ')[1]);
            if (!verifyToken) return false;
    
            return true;
        } catch (error) {
            console.trace(error);
            return false;
        }
    }
 }