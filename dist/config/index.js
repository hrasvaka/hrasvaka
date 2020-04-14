"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var conf_1 = __importDefault(require("conf"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var schema_1 = __importDefault(require("./schema"));
exports.default = new conf_1.default({
    cwd: path_1.default.join(process.cwd(), 'content', 'config'),
    schema: schema_1.default,
    clearInvalidConfig: true,
    fileExtension: 'yml',
    serialize: js_yaml_1.default.safeDump,
    deserialize: js_yaml_1.default.safeLoad,
});
