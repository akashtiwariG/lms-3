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
const administrator_1 = __importDefault(require("../middleware/administrator"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../db/index"));
const JWT_SECRET = require("../config");
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement admin signup logic
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    console.log(req.body);
    const user = yield index_1.default.administrators.findFirst({
        where: {
            email: email
        }
    });
    console.log(user);
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
router.post('/issue', administrator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement course creation logic
    const { department, issue, labno, status, description } = req.body;
    const newIssue = yield index_1.default.issues.create({
        data: {
            department,
            issue,
            labno,
            status,
            description
        }
    });
    console.log(issue);
    res.json({
        message: 'Issue created successfully', issueId: newIssue.id
    });
}));
router.post('/permission', administrator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = req.body.email;
    const b = req.body.password;
    const c = req.body.phonenumber;
    console.log(req.body);
    function createAdmin(email, password, phonenumber, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield index_1.default.admins.create({
                data: {
                    email,
                    password,
                    phonenumber,
                    status
                }
            });
            console.log(res);
        });
    }
    createAdmin(a, b, c, "admin");
    res.json({
        message: 'Admin created succesfully'
    });
}));
router.delete('/delete/:email', administrator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.email;
    console.log(_id);
    const response = yield index_1.default.admins.delete({
        where: {
            email: _id
        }
    });
    res.json({
        courses: response
    });
}));
router.get('/showIssue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield index_1.default.issues.findMany({});
    console.log(response);
    res.json({
        issue: response
    });
}));
exports.default = router;
