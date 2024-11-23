import { Request, Response } from "express";
import {ProductItemDto, ProductService} from "../services/productService.js";
import {RabbitService} from "../infrastructure/events/rabbitService.js";

const isMissing = (value: string) => value === undefined || value === null;

export class ProductController {

    private readonly productService: ProductService;
    private readonly rabbitService: RabbitService;

    constructor() {
        this.rabbitService = new RabbitService();
        this.productService = new ProductService(this.rabbitService);
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const {name, plu} = req.body
            if ([name, plu].some(isMissing)) {
                res.status(400).json({ message: "Поле не верные или нужно указать все: name, plu" });
                return;
            }
            const product = await this.productService.create({name, plu})
            if ("message" in product) {
                res.status(product.status).json(product)
                return;
            }
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const { plu, name } = req.query;

            if (typeof plu !== 'string' || typeof name !== 'string') {
                res.status(400).json({ message: 'Некорректные параметры запроса' });
                return;
            }

            const filters: ProductItemDto = {
                plu: parseInt(plu, 10),
                name,
            };

            const products = await this.productService.getProducts(filters);
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'});
        }
    }

}
