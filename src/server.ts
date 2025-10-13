import bodyParser from "body-parser";
import express from "express";
import { screenshot } from "./screenshot";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/screenshot", async (req, res) => {
  try {
    const result = await screenshot(req.body, req.headers);
    res.set("Content-Type", "image/png");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error taking screenshot");
  }
});

export { app };
