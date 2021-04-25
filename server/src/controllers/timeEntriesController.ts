import express, { Request, Response } from "express";
import { timeEntryService } from "../services/timeEntryService";

export const timeEntriesController = express.Router();

const service = new timeEntryService();

timeEntriesController.get("/", async (req: Request, res: Response) => {
  try {
    const timeEntries = await service.findAll();
    res.status(200).send(timeEntries);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

timeEntriesController.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 0);
  try {
    const timeEntries = await (await service.findAll()).filter(
      (x) => x.id === id
    );

    if (timeEntries.length > 0) {
      res.status(200).send(timeEntries[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (e) {
    res.status(500).send("Error");
  }
});

timeEntriesController.put("/:id", (req: Request, res: Response) => {
  try {
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Error");
  }
});

timeEntriesController.post("/", (req: Request, res: Response) => {
  res.status(201).send("OK");
});
