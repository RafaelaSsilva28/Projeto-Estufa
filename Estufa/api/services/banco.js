import "dotenv/config";
import { Pool } from "pg";

export const BD = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 8000,
});

BD.on("error", (error) => {
    console.error("Erro na conexão com o banco:", error.message);
});