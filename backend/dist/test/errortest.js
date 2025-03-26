"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const vendorcontrollers_1 = require("../controllers/vendorcontrollers");
// import Vendor from "./models/Vendor";
// Load environment variables
dotenv_1.default.config();
// Mock Express request
const mockRequest = (id) => ({
    params: { id }
});
// Mock Express response manually
const mockResponse = () => {
    const res = {};
    res.status = (code) => {
        console.log("Status Code:", code);
        return res;
    };
    res.json = (data) => {
        console.log("Response Data:", data);
        return res;
    };
    return res;
};
const testGetVendorById = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
        // Test with a valid vendor ID (replace with actual ID from your DB)
        const vendorId = "65e912ef8b245f55c3e8a1a2"; // Replace this with an existing vendor ID
        const req = mockRequest(vendorId);
        const res = mockResponse();
        yield (0, vendorcontrollers_1.getVendorById)(req, res);
    }
    catch (error) {
        console.error("❌ Error:", error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
// Run the test
testGetVendorById();
