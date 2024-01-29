"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
if (process.env.NODE_ENV === 'test') {
    (0, dotenv_1.config)({ path: '.env.test' });
}
else {
    (0, dotenv_1.config)();
}
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('production'),
    PORT: zod_1.z.coerce.number().default(3333),
    DB_CLIENT: zod_1.z.enum(['mysql']).default('mysql'),
    DB_HOST: zod_1.z.string(),
    DB_PORT: zod_1.z.coerce.number().default(5432),
    DB_USER: zod_1.z.string(),
    DB_PASSWORD: zod_1.z.string(),
    DB_DATABASE: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format());
    throw new Error('Invalid environment variables!');
}
exports.env = _env.data;
