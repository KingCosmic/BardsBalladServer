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
const db_1 = __importDefault(require("../db"));
// TODO: add in more checks (maybe a token, or something similar)
// rn all we check is if there's a user with that id, people could forge jwt's
// checks to see if the person is valid
exports.default = (decoded, request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.Users.find({
            _id: decoded.id,
        })
            .limit(1).toArray();
        if (users.length === 0)
            return { isValid: false };
        return { isValid: true, credentials: users[0] };
    }
    catch (e) {
        return { isValid: false };
    }
});
//# sourceMappingURL=jwt.js.map