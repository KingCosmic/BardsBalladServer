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
// setup our process.env variables for use
require('dotenv').config();
const hapi_1 = require("@hapi/hapi");
const db_1 = __importDefault(require("./db"));
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const hapi_gate_1 = __importDefault(require("hapi-gate"));
const jwt_1 = __importDefault(require("./validators/jwt"));
const routes_1 = __importDefault(require("./routes"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('starting');
    yield db_1.default.connect();
    console.log('connected to database');
    const server = hapi_1.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
        routes: {
            cors: true
        }
    });
    // sets up JWT authentication
    yield server.register(hapi_auth_jwt2_1.default);
    // forces our connections to https and non www
    yield server.register({
        plugin: hapi_gate_1.default,
        options: {
            https: false,
            nonwww: true
        }
    });
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.jwtKey,
        validate: jwt_1.default
    });
    server.auth.default('jwt');
    server.route(routes_1.default);
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=index.js.map