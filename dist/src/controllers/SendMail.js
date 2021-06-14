"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var path_1 = require("path");
var SendMailService_1 = __importDefault(require("../services/SendMailService"));
var Yup = __importStar(require("yup"));
var SendMail = /** @class */ (function () {
    function SendMail() {
    }
    SendMail.prototype.execute = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, office, email, phone, segment, role, subject, message, data, phoneRegex, schema, npsPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, office = _a.office, email = _a.email, phone = _a.phone, segment = _a.segment, role = _a.role, subject = _a.subject, message = _a.message;
                        data = {
                            name: name, office: office, email: email, phone: phone, segment: segment, role: role, subject: subject, message: message
                        };
                        phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
                        schema = Yup.object().shape({
                            name: Yup.string().required('Digite seu nome completo'),
                            office: Yup.string(),
                            email: Yup.string().email('Campo de email inválido').required(),
                            phone: Yup.string().matches(phoneRegex, 'Número de telefone inválido').min(11, 'Preencha o número de telefone corretamente com o DDD'),
                            segment: Yup.string(),
                            role: Yup.string(),
                            subject: Yup.string().required('Selecione um assunto'),
                            message: Yup.string().required('Conte um pouco em como podemos ajudar'),
                        });
                        return [4 /*yield*/, schema.validate(data, {
                                abortEarly: false
                            })];
                    case 1:
                        _b.sent();
                        npsPath = function (template) { return path_1.resolve(__dirname, '..', 'views', 'emails', template + ".hbs"); };
                        return [4 /*yield*/, SendMailService_1.default.execute(process.env.EMAIL_HOST, 'Lead - Agência ForUp', data, npsPath('lead'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, SendMailService_1.default.execute(email, 'Contato - Agência ForUp', data, npsPath('contact'))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                message: 'Email enviado com sucesso!'
                            })];
                }
            });
        });
    };
    return SendMail;
}());
exports.default = new SendMail;