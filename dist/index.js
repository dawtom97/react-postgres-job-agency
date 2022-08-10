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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// For connect req body into get and post
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('⚡️Expresowy + TypeScript Server');
});
//Get all companies
app.get('/api/v1/companies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_1.default.query("SELECT * FROM companies");
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
app.get('/api/v1/companies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const result = yield index_1.default.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                company: result.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
//Create company
app.post('/api/v1/companies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, price_range } = req.body;
    try {
        const results = yield index_1.default.query(`INSERT INTO companies (name,location,price_range) VALUES($1,$2,$3) returning *`, [name, location, price_range]);
        res.status(201).json({
            status: "success",
            data: {
                company: results.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
//Update companies
app.put('/api/v1/companies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    try {
        const results = yield index_1.default.query('UPDATE companies SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', [name, location, price_range, id]);
        res.status(200).json({
            status: "success",
            data: {
                company: results.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
// Company delete
app.delete("/api/v1/companies/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const results = yield index_1.default.query('DELETE FROM companies WHERE id = $1', [id]);
        res.status(204).json({
            status: "success",
            data: {
                company: results.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
