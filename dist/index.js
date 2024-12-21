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
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://frontend1-elk2o97p2-tusharsaini-05s-projects.vercel.app/"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));
const admin_1 = __importDefault(require("./routes/admin"));
const administrator_1 = __importDefault(require("./routes/administrator"));
const issue_1 = __importDefault(require("./db/issue"));
const axios = require('axios');
// Middleware for parsing request bodies
app.use(body_parser_1.default.json());
app.use("/admin", admin_1.default);
app.use("/administrator", administrator_1.default);
app.use("/issue", issue_1.default);
function createAdministrator(id, email, password, phonenumber, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.default.administrators.create({
            data: {
                id,
                email,
                password,
                phonenumber,
                status
            }
        });
        console.log(res);
    });
}
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
