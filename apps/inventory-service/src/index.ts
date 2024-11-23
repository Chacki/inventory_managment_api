import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {connectToDatabase} from "./infrastructure/db/db.js";
import router from "./routes/index.js";



const app = express();
const port = process.env.PORT || 3000;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'API для работы с продуктами',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        tags: [
            {
                name: 'Product',
                description: 'API для управления продуктами',
            },
            {
                name: 'Stock',
                description: 'API для управления остатками',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use('/api', router)

async function start () {
    await connectToDatabase()
    await app.listen(port, () => console.log(`Сервер запущен на ${port} порту`));
}

start()
