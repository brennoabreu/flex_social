"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const gerenciaErros = (erro, request, response, _) => {
    if (erro instanceof AppError_1.default) {
        return response.status(erro.statusCode).json({
            situacao: 'error',
            mensagem: erro.message,
        });
    }
    return response.status(500).json({
        situacao: 'error',
        mensagem: `Internal server error - ${erro.message}`,
    });
};
exports.default = gerenciaErros;
