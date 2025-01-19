import { Pool } from "pg";

const pool = new Pool({
  user: "neondb_owner",
  host: "DFast-9.cloud.neon.tech",
  database: "neondb",
  password: "ed67NaiwgnxP",
  port: 5432, // Default PostgreSQL port
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

