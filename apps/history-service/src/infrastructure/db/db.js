import dotenv from 'dotenv';
import {Sequelize} from "sequelize";
import {config} from "../../config/config.js";
dotenv.config()

export const InitPostgres = new Sequelize(
    config.pg.database,
    config.pg.user,
    config.pg.password,
    {
        dialect: 'postgres',
        host: config.pg.host,
        port: parseInt(config.pg.port, 10),
        define: {
            timestamps: false,
        },
    }
)

export async function connectToDatabase() {
    try {
        await InitPostgres.authenticate()
        await InitPostgres.sync()
        console.log('СУБД Postgres успешно подключена.')
        return true
    } catch (e) {
        throw new Error('Ошибка подключения Postgres')
    }
}
