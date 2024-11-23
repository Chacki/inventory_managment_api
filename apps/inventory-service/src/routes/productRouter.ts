import {Router} from "express";
import {ProductController} from "../controllers/productController.js";


const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать продукт
 *     description: Создаёт новый продукт.
 *     tags:
 *      - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product A"
 *               plu:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Продукт успешно создан.
 *       400:
 *         description: Неверные или отсутствующие поля.
 *       500:
 *         description: Ошибка сервера.
 */
router.post(
    '/products',
    (req, res) => productController.createProduct(req, res)
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список продуктов
 *     description: Возвращает список продуктов по фильтрам.
 *     tags:
 *     - Product
 *     parameters:
 *       - in: query
 *         name: plu
 *         required: false
 *         schema:
 *           type: integer
 *           example: 12345
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *           example: "Product A"
 *     responses:
 *       200:
 *         description: Список продуктов успешно получен.
 *       400:
 *         description: Некорректные параметры запроса.
 *       500:
 *         description: Ошибка сервера.
 */
router.get(
    '/products',
    (req, res) => productController.getProducts(req, res)
);


export default router