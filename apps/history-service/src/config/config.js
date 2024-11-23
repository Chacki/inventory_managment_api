import dotenv from "dotenv";
import path from 'path';
import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    'pg': {
        user: process.env.PG_USER,
        password: String(process.env.PG_PASSWORD),
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
    }
}