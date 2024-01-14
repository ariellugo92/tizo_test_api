import 'reflect-metadata';
import { Action, createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import JwtTokenService from "./utils/jwt_token.service";
import express from "express";
import mongoose from "mongoose";
import { AuthController } from "./modules/auth/controllers/auth.controller";
import { UserController } from "./modules/users/controllers/user.controller";
import { CategoryController } from "./modules/categories/controllers/category.controller";
import { ProductController } from "./modules/products/controllers/product.controller";

useContainer(Container);

const app = createExpressServer({
    authorizationChecker: JwtTokenService.authChecker,
    currentUserChecker: async (action: Action) => {
        const token = action.request.headers['authorization'];
        const decodeToken = JwtTokenService.getTokenDecode(token.split(' ')[1]);
        const userId = (decodeToken as any)['userId'];
        return userId;
    },
    cors: true,
    routePrefix: '/api',
    controllers: [
        AuthController,
        UserController,
        CategoryController,
        ProductController,
    ],
});

const PORT: string | number = process.env.port || 4000;

app.use(express.json());

const urlMongo = 'mongodb://127.0.0.1:27017/tizo_test';
mongoose.connect(urlMongo)
    .then(
        () => app.listen(PORT, () => console.log('Server and mongo is running'))
    )
    .catch((error) => {throw error});