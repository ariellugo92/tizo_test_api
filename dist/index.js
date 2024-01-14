"use strict";
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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = __importDefault(require("typedi"));
const jwt_token_service_1 = __importDefault(require("./utils/jwt_token.service"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_controller_1 = require("./modules/auth/controllers/auth.controller");
const user_controller_1 = require("./modules/users/controllers/user.controller");
const category_controller_1 = require("./modules/categories/controllers/category.controller");
const product_controller_1 = require("./modules/products/controllers/product.controller");
(0, routing_controllers_1.useContainer)(typedi_1.default);
const app = (0, routing_controllers_1.createExpressServer)({
    authorizationChecker: jwt_token_service_1.default.authChecker,
    currentUserChecker: (action) => __awaiter(void 0, void 0, void 0, function* () {
        const token = action.request.headers['authorization'];
        const decodeToken = jwt_token_service_1.default.getTokenDecode(token.split(' ')[1]);
        const userId = decodeToken['userId'];
        return userId;
    }),
    cors: true,
    routePrefix: '/api',
    controllers: [
        auth_controller_1.AuthController,
        user_controller_1.UserController,
        category_controller_1.CategoryController,
        product_controller_1.ProductController,
    ],
});
const PORT = process.env.port || 4000;
app.use(express_1.default.json());
const urlMongo = 'mongodb://127.0.0.1:27017/tizo_test';
mongoose_1.default.connect(urlMongo)
    .then(() => app.listen(PORT, () => console.log('Server and mongo is running')))
    .catch((error) => { throw error; });
