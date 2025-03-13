import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = postgres(connectionString, {
  onnotice: (msg) => console.log("Postgres Notice:", msg),
  onerror: (err) => console.error("Postgres Error:", err),
});

(async () => {
  try {
    await sql`SELECT 1`;
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

export default sql;
