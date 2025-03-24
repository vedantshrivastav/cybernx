import express, { Router } from "express";
import { createVendor, getVendors, getVendorById, updateVendor, deleteVendor } from "../controllers/vendorcontrollers";
const router : Router = express.Router();

router.post("/", createVendor);     // Create Vendor
router.get("/", getVendors);        // Get All Vendors
router.get("/:id", getVendorById); // Get Single Vendor
router.put("/:id", updateVendor);  // Update Vendor
router.delete("/:id", deleteVendor); // Delete Vendor

export default router;
