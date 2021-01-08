"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes = require('./user');
const characterRoutes = require('./character');
exports.default = [
    ...userRoutes,
    ...characterRoutes
];
//# sourceMappingURL=index.js.map