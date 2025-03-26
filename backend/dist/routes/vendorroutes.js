"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorcontrollers_1 = require("../controllers/vendorcontrollers");
const router = express_1.default.Router();
router.post("/", vendorcontrollers_1.createVendor); // Create Vendor
router.get("/", vendorcontrollers_1.getAllVendors); // Get All Vendors
router.get("/:id", vendorcontrollers_1.getVendorById); // Get Single Vendor
router.put("/:id", vendorcontrollers_1.updateVendor); // Update Vendor
router.delete("/:id", vendorcontrollers_1.deleteVendor); // Delete Vendor
exports.default = router;
