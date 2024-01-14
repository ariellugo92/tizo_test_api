import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { CategoryService } from "../services/category.service";
import { CategoryDto } from "../dtos/category.dto";

@Authorized()
@JsonController('/categories')
@Service()
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Get()
    async getAll(@Res() response: Response) {
        const results = await this.categoryService.getAll();
        return response.send(results);
    }

    @Get('/:id')
    async getById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.categoryService.getById(id);
        return response.send(result);
    }

    @Post()
    async create(@Body() data: CategoryDto, @Res() response: Response) {
        const result = await this.categoryService.save(data);
        return response.send(result);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() data: CategoryDto,
        @Res() response: Response,
    ) {
        const result = await this.categoryService.update(data, id);
        return response.send(result);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        const result = await this.categoryService.delete(id);
        return response.send(result);
    }

}