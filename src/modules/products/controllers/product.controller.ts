import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../dtos/product.dto";

@Authorized()
@JsonController('/products')
@Service()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Get()
    async getAll(@Res() response: Response) {
        const results = await this.productService.getAll();
        return response.send(results);
    }

    @Get('/:id')
    async getById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.productService.getById(id);
        return response.send(result);
    }

    @Post()
    async create(@Body() data: ProductDto, @Res() response: Response) {
        const result = await this.productService.save(data);
        return response.send(result);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() data: ProductDto,
        @Res() response: Response,
    ) {
        const result = await this.productService.update(data, id);
        return response.send(result);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        const result = await this.productService.delete(id);
        return response.send(result);
    }

}