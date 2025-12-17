import express from 'express';
import cors from 'cors';

import router from "./routes/weather.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", router);

export default app;