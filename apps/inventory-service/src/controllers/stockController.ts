import { Request, Response } from "express";
import {StockService} from "../services/stockService.js";
import {RabbitService} from "../infrastructure/events/rabbitService.js";

const isMissing = (value: string) => value === undefined || value === null;


export class StockController {

    private readonly stockService: StockService;
    private readonly rabbitService: RabbitService;

    constructor() {
        this.rabbitService = new RabbitService();
        this.stockService = new StockService(this.rabbitService);
    }

    async createStock(req: Request, res: Response): Promise<void> {
        try {

            const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body

            if ([product_id, shop_id, quantity_on_shelf, quantity_in_order].some(isMissing)) {
                res.status(400).json({ message: "Поле не верные или нужно указать все: product_id, shop_id, quantity_on_shelf, quantity_in_order" });
                return;
            }
            const stock = await this.stockService.create({ product_id, shop_id, quantity_on_shelf, quantity_in_order })
            if ("message" in stock) {
                res.status(stock.status).json(stock)
                return;
            }
            res.status(201).json(stock);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'});
        }
    }

    async increaseStock(req: Request, res: Response): Promise<void> {
        try {
            const { product_id, shop_id, amount } = req.body;
            if ([product_id, shop_id, amount].some(isMissing)) {
                res.status(400).json({ message: "Поле не верные или нужно указать все: product_id, shop_id, amount" });
                return;
            }
            const updatedStock = await this.stockService.increase(product_id, shop_id, amount)
            if ("message" in updatedStock) {
                res.status(updatedStock.status).json(updatedStock)
                return;
            }
            res.status(200).json(updatedStock);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'});
        }
    }

    async decreaseStock(req: Request, res: Response): Promise<void> {
        try {
            const { product_id, shop_id, amount } = req.body;
            if ([product_id, shop_id, amount].some(isMissing)) {
                res.status(400).json({ message: "Поле не верные или нужно указать все: product_id, shop_id, amount" });
                return;
            }
            const updatedStock = await this.stockService.decrease(product_id, shop_id, amount)
            if ("message" in updatedStock) {
                res.status(updatedStock.status).json(updatedStock)
                return;
            }
            res.status(200).json(updatedStock);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'});
        }
    }

    async getStocks(req: Request, res: Response): Promise<void> {
        try {

            let filters: any = {};

            ['plu', 'shop_id'].forEach((key) => {
                if (req.query[key]) {
                    filters[key] = parseInt(req.query[key] as string, 10);
                }
            });

            ['quantity_on_shelf', 'quantity_in_order'].forEach((key) => {
                const from = req.query[`${key}_from`];
                const to = req.query[`${key}_to`];

                if (from || to) {
                    filters[key] = {
                        ...(from && { from: parseInt(from as string, 10) }),
                        ...(to && { to: parseInt(to as string, 10) }),
                    };
                }
            });

            const stocks = await this.stockService.getStocks(filters);
            res.status(200).json(stocks);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ошибка сервера'});
        }
    }
}
