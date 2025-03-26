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

export const getAllVendors = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all vendors from the database
        const vendors = await Vendor.find({});

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

    } catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({
            message: "❌ Error fetching all vendors",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

// Optional: Add query parameter support for filtering
export const getFilteredVendors = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract query parameters
        const { 
            status, 
            type, 
            criticality 
        } = req.query;

        // Build a dynamic filter object
        const filter: any = {};
        if (status) filter.status = status;
        if (type) filter.type = type;
        if (criticality) filter.criticality = criticality;

        // Fetch vendors based on optional filters
        const vendors = await Vendor.find(filter);

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

    } catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({
            message: "❌ Error fetching filtered vendors",
            error: error instanceof Error ? error.message : String(error)
        });
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
export const updateVendor = async (req: Request, res: Response): Promise<void> => {
    try {
        // You need to specify the filter condition to find the vendor
        // Typically this would be the vendor's ID
        const { id } = req.params; // Assuming ID is passed in the URL parameters
        
        const vendor = await Vendor.findOneAndUpdate(
            { _id: id }, // Correct filter to find the specific vendor
            req.body,    // Update data from request body
            { new: true } // Returns the updated document
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
export const deleteVendor = async (req: Request, res: Response): Promise<void> => {
    try {
        const vendor = await Vendor.findOneAndDelete({
            _id: req.params.id,
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


