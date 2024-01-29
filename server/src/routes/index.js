"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import empresasRouter from './empresas.routes'
// import clientesRouter from './clientes.routes';
// import projetosRouter  from './projetos.routes';
// import programasRouter from './programas.routes';
const token_routes_1 = __importDefault(require("./token.routes"));
const routes = (0, express_1.Router)();
//routes.use('/empresas', empresasRouter);
// routes.use('/clientes', clientesRouter);
// routes.use('/projetos', projetosRouter);
// routes.use('/programas', programasRouter);
routes.use('/token', token_routes_1.default);
exports.default = routes;
