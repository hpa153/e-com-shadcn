"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextHandler = exports.nextApp = void 0;
var next_1 = __importDefault(require("next"));
var server_1 = require("./server");
exports.nextApp = (0, next_1.default)({
    dev: process.env.NODE_ENV !== "production",
    port: server_1.PORT,
});
exports.nextHandler = exports.nextApp.getRequestHandler();
