import mongoose from "mongoose";
import dotenv from "dotenv";
import { getVendorById } from "../controllers/vendorcontrollers";
// import Vendor from "./models/Vendor";

// Load environment variables
dotenv.config();

// Mock Express request
const mockRequest = (id: string) => ({
    params: { id }
}) as any;

// Mock Express response manually
const mockResponse = () => {
    const res: any = {};
    res.status = (code: number) => {
        console.log("Status Code:", code);
        return res;
    };
    res.json = (data: any) => {
        console.log("Response Data:", data);
        return res;
    };
    return res;
};

const testGetVendorById = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ Connected to MongoDB");

        // Test with a valid vendor ID (replace with actual ID from your DB)
        const vendorId = "65e912ef8b245f55c3e8a1a2"; // Replace this with an existing vendor ID
        const req = mockRequest(vendorId);
        const res = mockResponse();

        await getVendorById(req, res);
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        mongoose.disconnect();
    }
};

// Run the test
testGetVendorById();
