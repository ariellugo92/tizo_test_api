import { Body, JsonController, Post, Res } from "routing-controllers";
import { Service } from "typedi";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto } from "../dtos/auth-login.dto";
import { Response } from "express";
import { AuthRegisterDto } from "../dtos/auth-register.dto";

@JsonController('/auth')
@Service()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/validate-login')
    async validateLogin(
        @Body() data: AuthLoginDto,
        @Res() response: Response,
    ) {
        const result = await this.authService.validateLogin(data);
        return response.send(result);
    }

    @Post('/register')
    async register(
        @Body() data: AuthRegisterDto,
        @Res() response: Response,
    ) {
        const result = await this.authService.registerUser(data);
        return response.send(result);
    }

}