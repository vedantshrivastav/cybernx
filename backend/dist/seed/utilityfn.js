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
const uuid_1 = require("uuid");
const vendor_1 = require("../models/vendor"); // Adjust the import path as needed
const MONGO_URI = `mongodb+srv://shrivastavvedant15:vedu%40123@vendor-cluster.08n9c.mongodb.net/?retryWrites=true&w=majority&appName=Vendor-cluster`;
const vendorsData = [
    {
        id: (0, uuid_1.v4)(),
        name: "TechSupply Solutions",
        type: "Technology",
        criticality: "High",
        status: "Active",
        contact: "john.tech@techsupply.com",
        serviceProvided: "IT Hardware Procurement"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Global Logistics Inc.",
        type: "Logistics",
        criticality: "Critical",
        status: "Active",
        contact: "maria.logistics@globallog.com",
        serviceProvided: "International Shipping and Freight"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "CloudNet Solutions",
        type: "IT Services",
        criticality: "High",
        status: "Active",
        contact: "sarah.cloud@cloudnet.com",
        serviceProvided: "Cloud Infrastructure Management"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Green Energy Innovations",
        type: "Energy",
        criticality: "Medium",
        status: "Under Review",
        contact: "mike.green@energyinnovations.com",
        serviceProvided: "Renewable Energy Consulting"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Manufacturing Precision Inc.",
        type: "Manufacturing",
        criticality: "Critical",
        status: "Active",
        contact: "emily.precision@manufacturinginc.com",
        serviceProvided: "Precision Engineering Services"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Marketing Dynamics Group",
        type: "Marketing",
        criticality: "Low",
        status: "Inactive",
        contact: "alex.marketing@dynamicsgroup.com",
        serviceProvided: "Digital Marketing Strategy"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Healthcare Innovations Ltd.",
        type: "Medical Supplies",
        criticality: "High",
        status: "Active",
        contact: "david.health@healthcareinnovations.com",
        serviceProvided: "Medical Equipment Supply"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Financial Strategic Partners",
        type: "Financial Services",
        criticality: "Medium",
        status: "Under Review",
        contact: "lisa.finance@strategicpartners.com",
        serviceProvided: "Financial Advisory Services"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Research Frontier Solutions",
        type: "Research",
        criticality: "Low",
        status: "Inactive",
        contact: "karen.research@frontiersolve.com",
        serviceProvided: "Scientific Research Consulting"
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Sustainable Supply Chain Co.",
        type: "Logistics",
        criticality: "Critical",
        status: "Active",
        contact: "robert.supply@sustainablechain.com",
        serviceProvided: "Supply Chain Optimization"
    }
];
function seedVendors() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            yield vendor_1.Vendor.deleteMany({});
            const insertedVendors = yield vendor_1.Vendor.insertMany(vendorsData);
            console.log(`Successfully inserted ${insertedVendors.length} vendors`);
            yield mongoose_1.default.connection.close();
        }
        catch (error) {
            console.error('Error seeding vendors:', error);
            yield mongoose_1.default.connection.close();
        }
    });
}
seedVendors();
