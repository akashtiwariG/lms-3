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
const admin_1 = __importDefault(require("../middleware/admin"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../db/index"));
const JWT_SECRET = require("../config");
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const user = yield index_1.default.admins.findFirst({
        where: {
            email: email
        }
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            email
        }, JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(411).json({
            message: "Incorrect email and pass"
        });
    }
}));
router.post('/issue', admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement course creation logic
    console.log(req.body);
    const department = req.body.department;
    const issue = req.body.issue;
    const labno = req.body.labno;
    const status = req.body.status;
    const description = req.body.description;
    const newIssue = yield index_1.default.issues.create({
        data: {
            department,
            issue,
            labno,
            status,
            description
        }
    });
    if (newIssue) {
        res.json({
            newIssue
        });
    }
    else {
        res.status(411).json({
            message: "Incorrect request"
        });
    }
}));
router.get('/showIssue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield index_1.default.issues.findMany({});
    console.log(response);
    res.json({
        issue: response
    });
}));
router.delete('/deleteIssue', admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    const department = String(req.query.department);
    const labno = Number(req.query.labno);
    console.log(req.query);
    const response = yield index_1.default.issues.deleteMany({
        where: {
            id: id,
            department: department,
            labno: labno
        }
    });
    res.json({
        issue: response
    });
}));
exports.default = router;
