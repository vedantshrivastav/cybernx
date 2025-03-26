"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const vendorroutes_1 = __importDefault(require("./routes/vendorroutes"));
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/vendors", vendorroutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
