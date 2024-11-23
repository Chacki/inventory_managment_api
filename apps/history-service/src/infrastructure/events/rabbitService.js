import amqp from 'amqplib';

export class RabbitService {
    connection;
    channel;

    constructor() {
        this.connect().catch((error) =>
            console.error('Ошибка при инициализации соединения RabbitMQ:', error)
        );
    }

     async connect() {
        try {
            this.connection = await amqp.connect('amqp://127.0.0.1');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Ошибка при подключении к RabbitMQ:', error);
            throw error;
        }
    }

     async consume(queue, onMessage) {
        if (!this.channel) {
            throw new Error('Канал RabbitMQ не инициализирован');
        }
        try {
            await this.channel.assertQueue(queue, { durable: true });
            console.log(`Ожидание сообщений в очереди: ${queue}`);

            await this.channel.consume(
                queue,
                (msg) => {
                    if (msg) {
                        const messageContent = msg.content.toString();
                        console.log(`Полученное сообщение: ${messageContent}`);
                        onMessage(messageContent);
                        this.channel.ack(msg);
                    }
                },
                { noAck: false }
            );
        } catch (error) {
            console.error('Ошибка при получении сообщений от RabbitMQ:', error);
            throw error;
        }
    }
}
