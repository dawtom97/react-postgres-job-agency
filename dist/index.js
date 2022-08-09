"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./db/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// For connect req body into get and post
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('⚡️Expresowy + TypeScript Server');
});
//Get all companies
app.get('/api/v1/companies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_1.default.query("SELECT * FROM restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                company: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
}));
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
