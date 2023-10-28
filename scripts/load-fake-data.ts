import { Client } from "pg";
import { loadEnvConfig } from "@next/env"

const projctDir = process.cwd();
loadEnvConfig(projctDir);

async function loadFakeData() {

    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRESS_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRESS_PORT!),
    });

    await client.connect()

 ;   const res = await client.query("select 1");
    console.log(res);
    await client.end();
}

loadFakeData();
