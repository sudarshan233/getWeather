"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const __dirname = path_1.default.resolve();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
    app.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../frontend/dist/index.html"));
    });
}
app.use("/api/weather", weather_routes_1.default);
exports.default = app;
