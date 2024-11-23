import { RabbitService } from "../events/rabbitService.js";
import { HistoryService } from "../../service/historyService.js";

export async function initializeRabbit() {
    const rabbitService = new RabbitService();
    const historyService = new HistoryService();

    await rabbitService.connect();

    const queues = ['product_changes', 'stock_changes'];

    for (const queueName of queues) {
        console.log(`Прослушивание очереди RabbitMQ: ${queueName}`);

        await rabbitService.consume(queueName, async (message) => {
            try {
                let data = JSON.parse(message);

                if (queueName === 'product_changes') {
                    console.log(`[${queueName}] Received message:`, data);

                    // Сохранение данных в БД для product_changes
                    await historyService.saveHistory(data);

                } else if (queueName === 'stock_changes') {
                    console.log(`[${queueName}] Полученное сообщение:`, data);

                    // Сохранение данных в БД для stock_changes
                    await historyService.saveHistory(data);
                }

                console.log(`[${queueName}] История сохранена:`, data);
            } catch (error) {
                console.error(`[${queueName}] Не удалось обработать сообщение:`, error);
            }
        });
    }
}
