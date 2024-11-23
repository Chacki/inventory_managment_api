# Project: Inventory Management API

## Описание
***
Этот проект представляет собой API для управления товарами. Он включает два основных сервиса:

1. **Inventory Service** — для работы с товарами и остатками на складах.
2. **History Service** — для получения истории действий с товарами.

Проект предоставляет REST API для получения данных и выполнения операций с остатками товаров, а также для отслеживания истории изменений.
***
### Используемые технологии:
***
- **Express, PostgreSQL, RabbitMQ, Swagger**
***
## Структура проекта
***
Описание эндпоинтов будет на ходится по данному адрессу **`/api-docs`**
***
## Установка
***
1. Клонировать репозиторий:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
***
## Сборка и запуск
***
1. В каждом сервисе в .env файлах поменять данные для бд на свои
2. В inventory-service выполнить следующий команды:
```bash
npm run build
```
```bash
npm run start:prod
```
3. В history-service:
```bash
npm run start:prod
```
***