"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    viewedStatus: { type: Boolean, default: false },
    userOrigin: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    userDest: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
});
exports.NotificationModel = (0, mongoose_1.model)('Notification', notificationSchema);
