"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/singup', userController_1.singUp);
router.post('/singin', userController_1.singIn);
exports.default = router;
