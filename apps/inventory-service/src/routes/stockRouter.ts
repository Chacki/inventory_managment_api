import { Router } from "express";
import { StockController } from "../controllers/stockController.js";

const router = Router();

const stockController = new StockController();

/**
 * @swagger
 * /api/stocks:
 *   post:
 *     summary: Создать запись о остатке
 *     description: Создаёт новую запись о складе с количеством товара.
 *     tags:
 *      - Stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 123
 *               shop_id:
 *                 type: integer
 *                 example: 50
 *               quantity_on_shelf:
 *                 type: integer
 *                 example: 1
 *               quantity_in_order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Запись о остатке успешно создана.
 *       400:
 *         description: Неверные или отсутствующие поля.
 *       500:
 *         description: Ошибка сервера.
 */
router.post('/stocks', (req, res) => stockController.createStock(req, res));

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Получить список остатков
 *     description: Возвращает список всех остатков.
 *     tags:
 *      - Stock
 *     parameters:
 *       - in: query
 *         name: plu
 *         required: false
 *         schema:
 *           type: integer
 *           example: 123
 *         description: Артикул товара.
 *       - in: query
 *         name: shop_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID магазина.
 *       - in: query
 *         name: quantity_on_shelf_from
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Минимальное количество товара на складе.
 *       - in: query
 *         name: quantity_on_shelf_to
 *         required: false
 *         schema:
 *           type: integer
 *           example: 100
 *         description: Максимальное количество товара на складе.
 *       - in: query
 *         name: quantity_in_order_from
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Минимальное количество товара в заказах.
 *       - in: query
 *         name: quantity_in_order_to
 *         required: false
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Максимальное количество товара в заказах.
 *     responses:
 *       200:
 *         description: Список складов успешно получен.
 *       400:
 *         description: Некорректные параметры запроса.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/stocks', (req, res) => stockController.getStocks(req, res));
/**
 * @swagger
 * /api/stocks/increase:
 *   patch:
 *     summary: Увеличить количество товара на складе
 *     description: Увеличивает количество товара на складе для указанного товара и магазина.
 *     tags:
 *      - Stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 123
 *                 description: Артикул товара, для которого нужно увеличить количество на складе.
 *               shop_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID магазина, в котором нужно увеличить остатки товара.
 *               amount:
 *                 type: integer
 *                 example: 10
 *                 description: Количество товара, на которое нужно увеличить остатки.
 *     responses:
 *       200:
 *         description: Количество товара на складе успешно увеличено.
 *       400:
 *         description: Неверные или отсутствующие поля, или товара нет на складе.
 *       500:
 *         description: Ошибка сервера.
 */
router.patch('/stocks/increase', (req, res) => stockController.increaseStock(req, res));

/**
 * @swagger
 * /api/stocks/decrease:
 *   patch:
 *     summary: Уменьшить количество товара на складе
 *     description: Уменьшает количество товара на складе для указанного товара и магазина.
 *     tags:
 *      - Stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 123
 *                 description: Артикул товара, для которого нужно уменьшить количество на складе.
 *               shop_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID магазина, в котором нужно уменьшить остатки товара.
 *               amount:
 *                 type: integer
 *                 example: 5
 *                 description: Количество товара, на которое нужно уменьшить остатки.
 *     responses:
 *       200:
 *         description: Количество товара на складе успешно уменьшено.
 *       400:
 *         description: Недостаточно товара на складе или неверные параметры запроса.
 *       500:
 *         description: Ошибка сервера.
 */
router.patch('/stocks/decrease', (req, res) => stockController.decreaseStock(req, res));

export default router;
