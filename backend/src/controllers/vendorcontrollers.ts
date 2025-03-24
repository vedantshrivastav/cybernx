import { Request, Response } from "express";
import { Vendor } from "../models/vendor";

interface VendorParams {
    id: string;
}

// @desc Create a Vendor
export const createVendor = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {id} = req.body.id
        const vendor = new Vendor({
            id,
            ...req.body,
        });
        await vendor.save();
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: "❌ Error creating vendor", error });
    }
};

// @desc Get All Vendors for a specific user
export const getVendors = async (req: Request, res: Response) : Promise<void> => {
    try {
        // Get the Clerk user ID from the request headers
       
        // Only fetch vendors belonging to this user
        const vendors = await Vendor.find({});
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching vendors", error });
    }
};

// @desc Get Single Vendor by ID
export const getVendorById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const id = String(req.params.id);
        const clerkId = req.headers['x-clerk-user-id'] as string;
        
        if (!clerkId) {
            res.status(401).json({ message: "❌ Unauthorized: No Clerk user ID provided" });
            return;
        }

        const vendor = await Vendor.findOne({ _id: id, clerkId });
        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }

        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching vendor", error });
    }
};

// @desc Update Vendor
export const updateVendor = async (req: Request, res: Response) : Promise<void> => {
    try {

        const vendor = await Vendor.findOneAndUpdate(
            req.body,
            { new: true }
        );

        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }

        res.status(200).json(vendor);
    } catch (error) {
        res.status(400).json({ message: "❌ Error updating vendor", error });
    }
};

// @desc Delete Vendor
export const deleteVendor = async (req: Request, res: Response) : Promise<void> => {
    try {
        // const clerkId = req.headers['x-clerk-user-id'] as string;
        // if (!clerkId) {
        //     res.status(401).json({ message: "❌ Unauthorized: No Clerk user ID provided" });
        //     return;
        // }

        const vendor = await Vendor.findOneAndDelete({
            _id: req.params.id,
            // clerkId
        });

        if (!vendor) {
            res.status(404).json({ message: "❌ Vendor not found" });
            return;
        }

        res.status(200).json({ message: "✅ Vendor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error deleting vendor", error });
    }
};
