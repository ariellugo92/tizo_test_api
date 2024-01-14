import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/user.service";
import { Response, response } from "express";
import { UserSaveDto } from "../dtos/user-save.dto";
import { UserUpdateDto } from "../dtos/user-update.dto";

@Authorized()
@JsonController('/users')
@Service()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async getAll(@Res() response: Response) {
        const results = await this.userService.getAll();
        return response.send(results);
    }
    
    @Get('/my')
    async my(@CurrentUser() userId: string, @Res() response: Response) {
        const result = await this.userService.my(userId);
        return response.send(result);
    }

    @Get('/:id')
    async getById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.userService.getById(id);
        return response.send(result);
    }

    @Post()
    async create(@Body() data: UserSaveDto, @Res() response: Response) {
        const result = await this.userService.save(data);
        return response.send(result);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() data: UserUpdateDto,
        @Res() response: Response,
    ) {
        const result = await this.userService.update(data, id);
        return response.send(result);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        const result = await this.userService.delete(id);
        return response.send(result);
    }

}