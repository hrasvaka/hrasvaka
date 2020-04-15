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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var validator_1 = __importDefault(require("validator"));
var moment_1 = __importDefault(require("moment"));
var users_1 = __importDefault(require("../database/users"));
function registerNewUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response, emailOptions, salt, _a, usernameExists, emailExists;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = {
                        code: null,
                        error: null,
                        data: null,
                        message: null,
                    };
                    emailOptions = {
                        allow_display_name: false,
                        allow_ip_domain: false,
                        require_tld: true,
                    };
                    if (!data.username || !data.displayName || !data.email || !data.password) {
                        response.code = 422;
                        response.error = true;
                        if (!data.username)
                            response.message = 'A username is required.';
                        if (!data.displayName)
                            response.message = 'A name is required.';
                        if (!data.email)
                            response.message = 'An email is required.';
                        if (!data.password)
                            response.message = 'A strong password is required.';
                        return [2, response];
                    }
                    else if (data.username.includes(' ') ||
                        data.username.match(/^[A-Z]+$/) ||
                        data.username.length > 30 ||
                        data.password.length < 6 ||
                        data.displayName.length > 100 ||
                        Object.keys(data).length > 4 ||
                        validator_1.default.isEmail(data.email, emailOptions) == false) {
                        response.code = 422;
                        response.error = true;
                        if (data.username.includes(' '))
                            response.message = 'Username cannot contain spaces.';
                        if (data.username.match(/^[A-Z]+$/))
                            response.message = 'Username cannot contain uppercase characters.';
                        if (data.username.length > 30)
                            response.message = 'Username cannot be more than 30 characters.';
                        if (data.displayName.length > 100)
                            response.message = 'The name cannot be more than 100 characters.';
                        if (!validator_1.default.isEmail(data.email, emailOptions))
                            response.message = 'Invalid email address provided.';
                        if (data.password.length < 6)
                            response.message = 'A password of minimum 6 characters is required.';
                        if (Object.keys(data).length > 3)
                            response.message = "Expected 3 fields, but received " + Object.keys(data).length + " fields.";
                        if (response.error == true)
                            return [2, response];
                    }
                    return [4, bcryptjs_1.default.genSalt()];
                case 1:
                    salt = _b.sent();
                    _a = data;
                    return [4, bcryptjs_1.default.hash(data.password, salt)];
                case 2:
                    _a.password = _b.sent();
                    return [4, users_1.default.get.by.username(data.username)];
                case 3:
                    usernameExists = _b.sent();
                    return [4, users_1.default.get.by.email(data.email)];
                case 4:
                    emailExists = _b.sent();
                    if (emailExists || usernameExists) {
                        response.code = 409;
                        response.error = true;
                        if (emailExists)
                            response.message = 'The email is already registered. Please login.';
                        if (usernameExists)
                            response.message = 'The username is already taken.';
                        return [2, response];
                    }
                    return [4, users_1.default.addNew({
                            username: data.username,
                            displayName: data.displayName,
                            email: data.email,
                            password: data.password,
                            isAdmin: true,
                            createdOn: moment_1.default().format('x'),
                        })];
                case 5:
                    _b.sent();
                    response.code = 201;
                    response.error = false;
                    response.message = 'The new user has been successfully created.';
                    return [2, response];
            }
        });
    });
}
exports.default = {
    registerNewUser: registerNewUser,
};
