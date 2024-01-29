"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const env_1 = require("./env");
const body_parser_1 = __importDefault(require("body-parser"));
const gerenciaErros_1 = __importDefault(require("./middlewares/gerenciaErros"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(gerenciaErros_1.default);
app.get('/', (request, response) => {
    response.json('FLEX - API está online');
});
app.listen(env_1.env.PORT, () => {
    console.log(`Servidor executando na porta ${env_1.env.PORT}`);
});
