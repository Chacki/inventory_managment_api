import { Router } from "express";
import stockRouter from "./stockRouter.js";
import productRouter from "./productRouter.js";

const router = Router();

router.use(stockRouter);
router.use(productRouter);

export default router;
