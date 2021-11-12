import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm"
import { invoiceController } from "./controllers/invoiceController";

dotenv.config();

if (!process.env.PORT) {
  console.log('NO PORT CONFIGURED');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(cors());
// app.use(express.json());  TODO Rishi - Giving error: Argument of type 'NextHandleFunction' is not assignable to parameter of type 'PathParams'.
app.use("/api/invoices", invoiceController);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  const dbConnection = await createConnection();
  const invoiceRepo = dbConnection.getRepository('invoice');
  const invocies = await invoiceRepo.find();
  console.log('invoice count', invocies);
});
