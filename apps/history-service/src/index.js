import express from "express";
import {connectToDatabase} from "./infrastructure/db/db.js";
import router from "./routes/historyRouter.js";
import {initializeRabbit} from "./infrastructure/queue/queue.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = process.env.PORT || 3001;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'API для получении истории действий с товарами',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        tags: [
            {
                name: 'History',
                description: 'API для получении истории действий с товарами',
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
    await initializeRabbit()
    await app.listen(port, () => console.log(`Сервер запущен на ${port} порту`));
}

start()
