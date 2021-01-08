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
const routes = [];
/**
 * return all characters for a single user.
 */
routes.push({
    method: 'GET',
    path: '/characters',
    handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characters = yield db_1.default.Characters.find({
                ownerID: req.auth.credentials._id
            }).toArray();
            return h.response(characters).code(200);
        }
        catch (e) {
            return h.response(e).code(500);
        }
    }),
    options: {
        auth: 'jwt'
    }
});
/**
 * Here we get information for a specific character.
 *
 * Do we still nead this route? maybe if we provide links
 * to let others see your character.
 */
routes.push({
    method: 'GET',
    path: '/characters/{characterID}',
    handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userID = req.auth.credentials._id;
            const characters = yield db_1.default.Characters.find({
                _id: req.params.characterID
            })
                .limit(1).toArray();
            if (characters.length === 0)
                return h.response({ message: 'failed to find that character' }).code(404);
            const character = characters[0];
            if (character.ownerID !== userID)
                return h.response({ message: 'you do not have authorization to edit this character' }).code(403);
            return h.response(character).code(200);
        }
        catch (e) {
            return h.response(e).code(500);
        }
    }),
    options: {
        auth: 'jwt'
    }
});
routes.push({
    method: 'POST',
    path: '/characters/sync',
    handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = req.auth.credentials;
            const { created, updated, deleted } = req.payload;
            // create
            // update
            // delete ?
        }
        catch (e) {
            return h.response(e).code(500);
        }
    })
});
exports.default = routes;
//# sourceMappingURL=character.js.map