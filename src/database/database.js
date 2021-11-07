import pg from 'pg';
import '../setup.js';

const { Pool } = pg;

let connectionData = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
};

if (process.env.NODE_ENV === 'prod'){
    connectionData = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}

const connection = new Pool(connectionData);

export default connection;

