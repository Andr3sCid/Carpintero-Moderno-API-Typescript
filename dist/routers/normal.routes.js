"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicationController_1 = require("../controllers/publicationController");
const router = (0, express_1.Router)();
router.get('/publication/listHomePage', publicationController_1.listPublications);
exports.default = router;
