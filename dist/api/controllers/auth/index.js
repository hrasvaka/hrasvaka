"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var new_1 = __importDefault(require("./new"));
var login_1 = __importDefault(require("./login"));
exports.default = {
    new: new_1.default,
    login: login_1.default,
};
