import {config} from "../../config/config.js";
import {ProductModel} from "../../models/productModel.js";
import {StockModel} from "../../models/stockModel.js";
import dotenv from 'dotenv';
import {Sequelize} from "@sequelize/core";
dotenv.config()

const InitPostgres = new Sequelize({
    ...config.pg,
    // logging: console.log,
    models: [ProductModel, StockModel]
})

export async function connectToDatabase() {
    try {
        await InitPostgres.authenticate()
        await InitPostgres.sync()
        console.log('СУБД успешно подключена.')
        return true
    } catch (e) {
        throw new Error('Ошибка подключения Postgres')
    }
}
