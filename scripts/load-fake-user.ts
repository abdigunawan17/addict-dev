import { Client } from "pg";
import { loadEnvConfig } from "@next/env"
import { faker } from "@faker-js/faker";

const projctDir = process.cwd();
loadEnvConfig(projctDir);

async function loadFakeData(numUsers: number = 12) {
   

    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRESS_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRESS_PORT!),
    });

    await client.connect();   
    
    try {
        await client.query("begin")

        for(let i = 0; i < numUsers; i++) {
            await client.query(
                "insert into public.users (username, password, avatar) values($1, $2, $3)", 
            [faker.internet.userName(), "password", faker.image.avatar()]
            );
        }
        await client.query("commit")
    } catch (error) {
        await client.query("rollback")
        throw error
        
    } finally {
        await client.end();
    }
    console.log(`executing load fake data. Generating ${numUsers} data user.`);
    
}

const numUsers = parseInt(process.argv[2]) || 10;

console.log(`loading ${numUsers} fake users.`);

loadFakeData(numUsers);
