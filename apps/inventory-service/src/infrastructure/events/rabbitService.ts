import amqp, { Connection, Channel } from 'amqplib';

export class RabbitService {
    private connection!: Connection;
    private channel!: Channel;

    constructor() {
        this.connect().catch((error) =>
            console.error('Ошибка при инициализации соединения RabbitMQ:', error)
        );
    }

    private async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect('amqp://127.0.0.1');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Ошибка при подключении к RabbitMQ:', error);
            throw error;
        }
    }

    async sendToQueue(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error('Канал RabbitMQ не инициализирован');
        }
        try {
            await this.channel.assertQueue(queue, { durable: true });
            this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
            console.log(`Сообщение, отправленное в очередь ${queue}`);
        } catch (error) {
            console.error('Error sending message to RabbitMQ:', error);
            throw error;
        }
    }
}
