"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var conf_1 = __importDefault(require("conf"));
var crypto_random_string_1 = __importDefault(require("crypto-random-string"));
var schema_1 = __importDefault(require("./schema"));
var config = new conf_1.default({
    cwd: path_1.default.join(process.cwd(), 'config'),
    schema: schema_1.default,
    clearInvalidConfig: true,
});
if (config.get('database.client') == 'mysql') {
    config.set('database.client', 'mysql2');
}
if (!config.get('database.connection.port')) {
    if (config.get('database.client') == 'mysql2') {
        config.set('database.connection.port', 3306);
    }
    else if (config.get('database.client') == 'pg') {
        config.set('database.connection.port', 5432);
    }
}
if (!config.get('privateSecret'))
    config.set('privateSecret', crypto_random_string_1.default({ length: 32 }));
if (config.get('frontend') == undefined)
    config.set('frontend', true);
exports.default = config;
