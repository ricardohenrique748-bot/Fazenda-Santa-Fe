const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
});

async function run() {
    await client.connect();
    console.log('Connected to DB');
    const res = await client.query('SELECT * FROM "Usuario" LIMIT 1');
    console.log('Columns:', res.fields.map(f => f.name));
    console.log('First row:', res.rows[0]);
    await client.end();
}

run().catch(console.error);
