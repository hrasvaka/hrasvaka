"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var moment_1 = __importDefault(require("moment"));
function info(message) {
    console.log(moment_1.default().format('YYYY-MM-DD hh-mm-ss') + " [" + chalk_1.default.yellowBright('INFO') + "] " + message);
}
exports.default = info;
