import {Router} from "express";
import {HistoryController} from "../controllers/historyController.js";


const router = Router();
const historyController = new HistoryController();

/**
 * @swagger
 * /api/stocks/history:
 *   get:
 *     summary: Получить историю действий с товарами
 *     description: Возвращает историю изменений товаров, с возможностью фильтрации по различным параметрам.
 *     tags:
 *      - History
 *     parameters:
 *       - in: query
 *         name: shop_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID магазина, для которого нужно получить историю изменений остатков.
 *       - in: query
 *         name: plu
 *         required: false
 *         schema:
 *           type: integer
 *           example: 123
 *         description: Артикул товара, для которого нужно получить историю изменений остатков.
 *       - in: query
 *         name: action
 *         required: false
 *         schema:
 *           type: string
 *           enum: [increase, decrease]
 *           example: "increase"
 *         description: Действие в истории (увеличение или уменьшение остатков).
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         description: Начальная дата для фильтрации изменений остатков.
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-11-30"
 *         description: Конечная дата для фильтрации изменений остатков.
 *     responses:
 *       200:
 *         description: История изменений остатков успешно получена.
 *       400:
 *         description: Неверный формат даты или отсутствующие параметры.
 *       500:
 *         description: Ошибка сервера.
 */
router.get(
    '/history',
    (req, res) => historyController.getHistory(req, res)
);


export default router