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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const autenticacao_1 = __importDefault(require("../config/autenticacao"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const tokenRouter = (0, express_1.Router)();
tokenRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
    const [login, senha] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (!login || !senha) {
        throw new AppError_1.default('Informe o usuário e a senha', 401);
    }
    const { secret, expiresIn } = autenticacao_1.default.jwt;
    ;
    const token = (0, jsonwebtoken_1.sign)({}, secret, {
        subject: login + ' ' + senha,
        expiresIn,
    });
    return response.json({
        token,
    });
}));
exports.default = tokenRouter;
