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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.updateVendor = exports.getVendorById = exports.getFilteredVendors = exports.getAllVendors = exports.createVendor = void 0;
const vendor_1 = require("../models/vendor");
// @desc Create a Vendor
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.id;
        const vendor = new vendor_1.Vendor(Object.assign({ id }, req.body));
        yield vendor.save();
        res.status(201).json(vendor);
    }
    catch (error) {
        res.status(400).json({ message: "❌ Error creating vendor", error });
    }
});
exports.createVendor = createVendor;
const getAllVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all vendors from the database
        const vendors = yield vendor_1.Vendor.find({});
        // Check if any vendors exist
        if (vendors.length === 0) {
            res.status(404).json({
                message: "No vendors found",
                vendors: []
            });
            return;
        }
        // Successfully return all vendors
        res.status(200).json({
            message: "✅ Vendors retrieved successfully",
            count: vendors.length,
            vendors: vendors
        });
    }
    catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({
            message: "❌ Error fetching all vendors",
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.getAllVendors = getAllVendors;
// Optional: Add query parameter support for filtering
const getFilteredVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract query parameters
        const { status, type, criticality } = req.query;
        // Build a dynamic filter object
        const filter = {};
        if (status)
            filter.status = status;
        if (type)
            filter.type = type;
        if (criticality)
            filter.criticality = criticality;
        // Fetch vendors based on optional filters
        const vendors = yield vendor_1.Vendor.find(filter);
        // Check if any vendors match the filter
        if (vendors.length === 0) {
            res.status(404).json({
                message: "No vendors found matching the specified criteria",
                vendors: []
            });
            return;
        }
        // Successfully return filtered vendors
        res.status(200).json({
            message: "✅ Filtered vendors retrieved successfully",
            count: vendors.length,
            vendors: vendors
        });
    }
    catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({
            message: "❌ Error fetching filtered vendors",
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.getFilteredVendors = getFilteredVendors;
// @desc Get Single Vendor by ID
const getVendorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        const clerkId = req.headers['x-clerk-user-id'];
        if (!clerkId) {
            res.status(401).json({ message: "❌ Unauthorized: No Clerk user ID provided" });
            return;
        }
        const vendor = yield vendor_1.Vendor.findOne({ _id: id, clerkId });
        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }
        res.status(200).json(vendor);
    }
    catch (error) {
        res.status(500).json({ message: "❌ Error fetching vendor", error });
    }
});
exports.getVendorById = getVendorById;
// @desc Update Vendor
const updateVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // You need to specify the filter condition to find the vendor
        // Typically this would be the vendor's ID
        const { id } = req.params; // Assuming ID is passed in the URL parameters
        const vendor = yield vendor_1.Vendor.findOneAndUpdate({ _id: id }, // Correct filter to find the specific vendor
        req.body, // Update data from request body
        { new: true } // Returns the updated document
        );
        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }
        res.status(200).json(vendor);
    }
    catch (error) {
        res.status(400).json({ message: "❌ Error updating vendor", error });
    }
});
exports.updateVendor = updateVendor;
// @desc Delete Vendor
const deleteVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendor.findOneAndDelete({
            _id: req.params.id,
        });
        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }
        res.status(200).json({ message: "✅ Vendor deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "❌ Error deleting vendor", error });
    }
});
exports.deleteVendor = deleteVendor;
