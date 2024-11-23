import {StockModel} from "../models/stockModel.js";
import {ProductModel} from "../models/productModel.js";
import {RabbitService} from "../infrastructure/events/rabbitService.js";
import {Op} from "@sequelize/core";

interface StockItemDto {
    product_id: number;
    shop_id: number;
    quantity_on_shelf: number;
    quantity_in_order: number;
}

export interface StockFilter {
    plu: number;
    shop_id: number;
    quantity_on_shelf: { from: number; to: number };
    quantity_in_order: { from: number; to: number };
}

class StockService {

    private readonly rabbitService: RabbitService;

    constructor(rabbitService: RabbitService) {
        this.rabbitService = rabbitService;
    }

    async create (stockItem: StockItemDto): Promise<StockModel | {message: string, status: number}> {
        const product = await ProductModel.findOne({where: {id: stockItem.product_id}});
        if (!product) {
           return {message: "Данного товара нет!", status: 400}
        }
        const create = await StockModel.create(stockItem)


        await this.rabbitService.sendToQueue('stock_changes', JSON.stringify({
            action: 'create',
            ...create.dataValues
        }));
        return create
    }

    async decrease(productId: number, shopId: number, amount: number): Promise<StockModel | {message: string, status: number}> {
        const stock = await StockModel.findOne({ where: { product_id: productId, shop_id: shopId } });
        if (!stock) {
            return  {message: "Данного товара нет!", status: 400};
        }

        if (stock.quantity_on_shelf < amount) {
            return  {message: "Недостаточно остатков!", status: 400};
        }

        stock.quantity_on_shelf -= amount;
        await stock.save();

        await this.rabbitService.sendToQueue('stock_changes', JSON.stringify({
            action: 'decrease',
            ...stock.dataValues,
        }));

        return stock;
    }

    async increase(productId: number, shopId: number, amount: number): Promise<StockModel | {message: string, status: number}> {

        const stock = await StockModel.findOne({ where: { product_id: productId, shop_id: shopId } });

        if (!stock) {
            return  {message: "Данного товара нет!", status: 400};
        }

        stock.quantity_on_shelf += amount;
        await stock.save();

        await this.rabbitService.sendToQueue('stock_changes', JSON.stringify({
            action: 'increase',
            ...stock.dataValues,

        }));

        return stock;
    }

    async getStocks(filters: StockFilter): Promise<StockModel[]> {

        const whereClause: any = {};


        if (filters.shop_id) {
            whereClause.shop_id = filters.shop_id;
        }

        if (filters.plu) {
            whereClause.plu = filters.plu;
        }

        if (filters.quantity_on_shelf) {
            const { from, to } = filters.quantity_on_shelf;
            whereClause.quantity_on_shelf = {};
            if (from !== undefined) whereClause.quantity_on_shelf[Op.gte] = from;
            if (to !== undefined) whereClause.quantity_on_shelf[Op.lte] = to;
        }

        if (filters.quantity_in_order) {
            const { from, to } = filters.quantity_in_order;
            whereClause.quantity_in_order = {};
            if (from !== undefined) whereClause.quantity_in_order[Op.gte] = from;
            if (to !== undefined) whereClause.quantity_in_order[Op.lte] = to;
        }

        const stocks = await StockModel.findAll({ where: whereClause });


        await this.rabbitService.sendToQueue('stock_changes', JSON.stringify({
            action: 'getStocks',
            ...filters
        }));

        return stocks;
    }
}

export {
    StockService
}