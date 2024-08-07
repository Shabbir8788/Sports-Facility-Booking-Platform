"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const booking_controller_1 = require("./app/modules/Booking/booking.controller");
const app = (0, express_1.default)();
//  parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
//  Application Routes
app.use('/api', routes_1.default);
// Default Home Routes
app.get('/', (req, res) => {
    res.send('Sports Facility Booking Platform !');
});
// Check-Availability Route
app.get('/api/check-availability', booking_controller_1.BookingControllers.checkAvailability);
//  Global Error Handler
app.use(globalErrorHandler_1.default);
// Not Found Route
app.use(notFound_1.default);
exports.default = app;
