import express from 'express';

import router from "./routes/weather.routes";

const app = express();

app.use(express.json());
app.use("/api/weather", router);

export default app;