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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const typedi_1 = require("typedi");
const product_repository_1 = require("../repositories/product.repository");
let ProductService = class ProductService {
    constructor(productRepositoty) {
        this.productRepositoty = productRepositoty;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productRepositoty.get();
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productRepositoty.getById(id);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                code: data.code,
                name: data.name,
                description: data.description,
                category: data.category,
                unitMeasurement: data.unitMeasurement,
                minQuantity: data.minQuantity,
                quantity: data.quantity,
                price: data.price,
            };
            try {
                yield this.productRepositoty.save(newProduct);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productRepositoty.update(data, id);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepositoty.getById(id);
            if (!product)
                return false;
            try {
                yield this.productRepositoty.updateValue(id, { nameKey: 'status', value: false });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepositoty])
], ProductService);
