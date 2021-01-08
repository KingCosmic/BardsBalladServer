"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const joi_1 = __importDefault(require("@hapi/joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = [];
routes.push({
    method: 'POST',
    path: '/auth/login',
    handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.payload;
        console.log(`logging in ${email}`);
        const users = yield db_1.default.Users.find({ email: email.toLowerCase() }).limit(1).toArray();
        if (users.length === 0)
            return h.response('no users with that email').code(404);
        let user = users[0];
        const isCorrectPassword = yield bcrypt.compare(password, user.password);
        if (!isCorrectPassword)
            return h.response('passwords do not match').code(403);
        const token = jsonwebtoken_1.default.sign(user._id, process.env.jwtKey);
        return h.response({
            token
        }).code(200);
    }),
    options: {
        auth: false,
        validate: {
            query: joi_1.default.object({
                username: joi_1.default.string().min(1).max(20),
                password: joi_1.default.string().min(7)
            })
        }
    }
});
routes.push({
    method: 'POST',
    path: '/auth/signup',
    handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.payload;
        const hash = yield bcrypt.hash(password, process.env.saltingRounds);
        const user = {
            email: email.toLowerCase(),
            password: hash
        };
        const result = yield db_1.default.Users.insertOne(user);
        const token = jsonwebtoken_1.default.sign(result.ops[0]._id, process.env.jwtKey);
        return h.response({
            token
        }).code(200);
    }),
    options: {
        auth: false,
        validate: {
            query: joi_1.default.object({
                username: joi_1.default.string().min(1).max(20),
                password: joi_1.default.string().min(7)
            })
        }
    }
});
exports.default = routes;
//# sourceMappingURL=user.js.map