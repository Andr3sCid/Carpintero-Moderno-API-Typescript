"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || "CarpinteroModerno",
    DB: {
        MONGO: {
            URI: process.env.MONGODB_URI ||
                "mongodb+srv://Andr3sCid:dRZ2U6OKbrIQCfUb@cluster0.dd2svyc.mongodb.net/Carpintero-Moderno?retryWrites=true&w=majority",
            USER: process.env.MONGODB_USER,
            PASSWORD: process.env.MONGODB_PASSWORD,
        },
        FIREBASE: {
            apiKey: "AIzaSyBuwtGdR05XkpurFf1jLA5NdpwqwFhnTWI",
            authDomain: "carpintero-moderno.firebaseapp.com",
            projectId: "carpintero-moderno",
            storageBucket: "carpintero-moderno.appspot.com",
            messagingSenderId: "149789382936",
            appId: "1:149789382936:web:d65f8c8b037de03dfe266d",
            measurementId: "G-V42G5P7PXB",
        },
    },
};
