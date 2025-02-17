import express, { Request, Response } from "express";
import client from "prom-client";

const router = express.Router();

// Collect default system metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Create a counter for HTTP requests
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of requests",
  labelNames: ["method", "route", "status"],
});

// Middleware to count requests
router.use((req: Request, res: Response, next) => {
  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : "unknown",
      status: res.statusCode,
    });
  });
  next();
});

// Define the `/metrics` route
router.get("/", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

export default router;
