"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../errors/AppError"));
const autenticacao_1 = __importDefault(require("../config/autenticacao"));
function garantirAutenticacao(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, autenticacao_1.default.jwt.secret);
        const { sub } = decoded;
        const [empresa, codigo] = sub.split(' ');
        request.usuario = {
            empresa: empresa,
            codigo: codigo,
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.default('Invalid JWT token', 401);
    }
}
exports.default = garantirAutenticacao;
