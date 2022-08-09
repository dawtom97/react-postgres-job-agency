"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// For connect req body into get and post
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('⚡️Expresowy + TypeScript Server');
});
//Get all companies
app.get('/api/v1/companies', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            company: ['lemonbay', 'ernabo'],
        },
    });
});
//Get specific company
app.get('/api/v1/companies/:id', (req, res) => {
    console.log(req.params.id);
});
//Create company
app.post('/api/v1/companies', (req, res) => {
    console.log(req.body);
});
//Update companies
app.put('/api/v1/companies/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
});
app.delete("/api/v1/companies/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
