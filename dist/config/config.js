"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'CarpinteroModerno',
    DB: {
        URI: process.env.MONGODB_URI || "mongodb+srv://Andr3sCid:dRZ2U6OKbrIQCfUb@cluster0.dd2svyc.mongodb.net/Carpintero-Moderno?retryWrites=true&w=majority",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};
