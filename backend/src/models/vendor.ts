import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    criticality: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
    status: { type: String, enum: ["Active", "Under Review", "Inactive"], required: true },
    contact: { type: String, unique: true, required: true },
}, { timestamps: true });

export const Vendor = mongoose.model("Vendor", VendorSchema);
