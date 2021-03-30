"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Holiday_1 = require("./Holiday/Holiday");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.post('/fetchHoliday', Holiday_1.fetchHoliday);
app.listen(5050, () => {
    console.log('Server Running');
});
