import express, { Request, Response } from "express";
import { timesheetService } from "../services/timesheetService";

export const timesheetsController = express.Router();

const service = new timesheetService();

timesheetsController.get("/", async (req: Request, res: Response) => {
  try {
    const timesheets = await service.findAll();
    res.status(200).send(timesheets);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

timesheetsController.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 0);
  try {
    const timesheets = await (await service.findAll()).filter(
      (x) => x.id === id
    );

    if (timesheets.length > 0) {
      res.status(200).send(timesheets[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (e) {
    res.status(500).send("Error");
  }
});

timesheetsController.put("/:id", (req: Request, res: Response) => {
  try {
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Error");
  }
});

timesheetsController.post("/", (req: Request, res: Response) => {
  res.status(201).send("OK");
});
