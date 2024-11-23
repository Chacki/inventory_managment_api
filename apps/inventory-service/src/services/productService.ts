import {ProductModel} from "../models/productModel.js";
import {RabbitService} from "../infrastructure/events/rabbitService.js";

export interface ProductItemDto {
    plu: number;
    name: string;
}

class ProductService {

    private readonly rabbitService: RabbitService;

    constructor(rabbitService: RabbitService) {
        this.rabbitService = rabbitService;
    }

    async create (productItem: ProductItemDto): Promise<ProductModel | {message: string, status: number}> {
        const product = await ProductModel.findOne({ where: {plu: productItem.plu} });
        if (product) {
           return {message: "Данный артикул уже существует!", status: 400}
        }
        const create = await ProductModel.create(productItem)
        await this.rabbitService.sendToQueue('product_changes', JSON.stringify({
            action: 'create',
            ...create.dataValues
        }));
        return create;
    }

    async getProducts(filter: ProductItemDto): Promise<ProductModel[]> {
        const products = await ProductModel.findAll({ where: { ...filter } });

        await this.rabbitService.sendToQueue('product_changes', JSON.stringify({
            action: 'read',
            ...filter
        }));

        return products;
    }

}

export {
    ProductService
}