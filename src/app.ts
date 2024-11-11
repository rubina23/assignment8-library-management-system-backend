import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Library Management System!",
  });
});

app.use("/api", router);

export default app;
