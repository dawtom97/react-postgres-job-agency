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
const index_1 = __importDefault(require("../db/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userLogin = yield index_1.default.query("SELECT * from users where username=$1", [username]);
    if (userLogin.rowCount > 0) {
        const isSamePass = yield bcrypt_1.default.compare(password, userLogin.rows[0].passhash);
        if (isSamePass) {
            //login
            req.session.user = {
                username,
                id: userLogin.rows[0].id
            };
            res.json({
                loggedIn: true,
                username
            });
        }
        else {
            res.json({
                loggedIn: false,
                status: "Wrong username or password"
            });
        }
    }
    else {
        console.log("Not good");
        res.json({
            loggedIn: false,
            status: "Wrong username or password"
        });
    }
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, "CO JEST");
    try {
        const { username, password, email, firstname, lastname } = req.body;
        const userExist = yield index_1.default.query('SELECT username from users WHERE username = $1', [username]);
        if (userExist.rowCount === 0) {
            //register
            const hashedPass = yield bcrypt_1.default.hash(password, 10);
            const newUserQuery = yield index_1.default.query('INSERT INTO users(username,passhash,email,firstname,lastname) VALUES ($1,$2,$3,$4,$5) returning username', [username, hashedPass, email, firstname, lastname]);
            req.session.user = {
                username,
                id: newUserQuery.rows[0].id
            };
            res.json({
                loggedIn: true,
                status: "success",
                username
            });
        }
        else {
            res.json({
                loggedIn: false,
                status: "taken"
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
