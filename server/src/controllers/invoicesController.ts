import express, { Request, Response } from "express";
import { invoicesService } from "../services/invoicesService";

export const invoicesController = express.Router();

const service = new invoicesService();

invoicesController.get("/", (req: Request, res: Response) => {
  try {
    const invoices = service.findAll();
    res.status(200).send(invoices);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// invoicesController.get("/:id", (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 0);
//   try {
//     const invoices = service.findAll().filter((x) => x.id === id);

//     if (invoices.length > 0) {
//       res.status(200).send(invoices[0]);
//     } else {
//       res.status(404).send("Not found");
//     }
//   } catch (e) {
//     res.status(500).send("Error");
//   }
// });

invoicesController.put("/:id", (req: Request, res: Response) => {
  try {
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Error");
  }
});

invoicesController.post("/", (req: Request, res: Response) => {
  res.status(201).send("OK");
});
