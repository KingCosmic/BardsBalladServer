"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthchecks_1 = __importDefault(require("./healthchecks"));
const character_1 = __importDefault(require("./character"));
const user_1 = __importDefault(require("./user"));
exports.default = [
    ...healthchecks_1.default,
    ...character_1.default,
    ...user_1.default,
];
//# sourceMappingURL=index.js.map