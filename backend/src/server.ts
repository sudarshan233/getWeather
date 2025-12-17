import express from 'express';
import cors from 'cors';

import router from "./routes/weather.routes";
import path from "path";

const app = express();
const __dirname = path.resolve()

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })

}

app.use("/api/weather", router);

export default app;