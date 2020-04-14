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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var execa_1 = __importDefault(require("execa"));
var config_1 = __importDefault(require("../../config"));
var logger_1 = __importDefault(require("../../logger"));
exports.default = knex_1.default(config_1.default.get('database'));
var conf = config_1.default.get('database');
if (conf.client == 'mysql') {
    conf.client = 'mysql2';
}
function initializeTables() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, execa_1.default(path_1.default.join(process.cwd(), 'node_modules', '.bin', 'knex'), [
                            'migrate:latest',
                        ])];
                case 1:
                    _a.sent();
                    logger_1.default.info(chalk_1.default.greenBright('Finished syncing database structure'));
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    logger_1.default.error(e_1);
                    process.exit(3);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var tempDatabase, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, knex_1.default(config_1.default.get('database'))];
                case 1:
                    tempDatabase = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4, tempDatabase.raw('SELECT 1')];
                case 3:
                    _a.sent();
                    logger_1.default.info(chalk_1.default.greenBright('Connected to the database'));
                    return [4, initializeTables()];
                case 4:
                    _a.sent();
                    return [3, 6];
                case 5:
                    e_2 = _a.sent();
                    logger_1.default.error("Failed to connect to the database due to: " + e_2.message);
                    process.exit(2);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.connectToDatabase = connectToDatabase;
