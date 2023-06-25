"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationModel = void 0;
const mongoose_1 = require("mongoose");
const publicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    valoration: { type: Number, default: 0 },
    materials: [{ type: String }],
    tools: [{ type: String }],
    difficulty: { type: String },
    imgPreviewed: { type: String },
    description: { type: String },
    steps: { type: mongoose_1.Schema.Types.Mixed },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.PublicationModel = (0, mongoose_1.model)('Publication', publicationSchema);
