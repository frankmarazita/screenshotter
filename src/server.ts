import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

export { app };
