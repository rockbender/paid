import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection, Connection } from "typeorm";
import { invoicesController } from "./controllers/invoicesController";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

async function main(): Promise<void> {
  const connection = await createConnection({
    type: "mariadb",
    host: "192.168.0.171",
    port: 3306,
    username: "sa",
    password: "abc123",
    database: "paidDb",
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/invoices", invoicesController);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
