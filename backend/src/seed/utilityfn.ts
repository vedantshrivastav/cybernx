import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Vendor } from '../models/vendor'; // Adjust the import path as needed

const MONGO_URI=`mongodb+srv://shrivastavvedant15:vedu%40123@vendor-cluster.08n9c.mongodb.net/?retryWrites=true&w=majority&appName=Vendor-cluster`
const vendorsData = [
    {
        id: uuidv4(),
        name: "TechSupply Solutions",
        type: "Technology",
        criticality: "High",
        status: "Active",
        contact: "john.tech@techsupply.com",
        serviceProvided: "IT Hardware Procurement"
    },
    {
        id: uuidv4(),
        name: "Global Logistics Inc.",
        type: "Logistics",
        criticality: "Critical",
        status: "Active",
        contact: "maria.logistics@globallog.com",
        serviceProvided: "International Shipping and Freight"
    },
    {
        id: uuidv4(),
        name: "CloudNet Solutions",
        type: "IT Services",
        criticality: "High",
        status: "Active",
        contact: "sarah.cloud@cloudnet.com",
        serviceProvided: "Cloud Infrastructure Management"
    },
    {
        id: uuidv4(),
        name: "Green Energy Innovations",
        type: "Energy",
        criticality: "Medium",
        status: "Under Review",
        contact: "mike.green@energyinnovations.com",
        serviceProvided: "Renewable Energy Consulting"
    },
    {
        id: uuidv4(),
        name: "Manufacturing Precision Inc.",
        type: "Manufacturing",
        criticality: "Critical",
        status: "Active",
        contact: "emily.precision@manufacturinginc.com",
        serviceProvided: "Precision Engineering Services"
    },
    {
        id: uuidv4(),
        name: "Marketing Dynamics Group",
        type: "Marketing",
        criticality: "Low",
        status: "Inactive",
        contact: "alex.marketing@dynamicsgroup.com",
        serviceProvided: "Digital Marketing Strategy"
    },
    {
        id: uuidv4(),
        name: "Healthcare Innovations Ltd.",
        type: "Medical Supplies",
        criticality: "High",
        status: "Active",
        contact: "david.health@healthcareinnovations.com",
        serviceProvided: "Medical Equipment Supply"
    },
    {
        id: uuidv4(),
        name: "Financial Strategic Partners",
        type: "Financial Services",
        criticality: "Medium",
        status: "Under Review",
        contact: "lisa.finance@strategicpartners.com",
        serviceProvided: "Financial Advisory Services"
    },
    {
        id: uuidv4(),
        name: "Research Frontier Solutions",
        type: "Research",
        criticality: "Low",
        status: "Inactive",
        contact: "karen.research@frontiersolve.com",
        serviceProvided: "Scientific Research Consulting"
    },
    {
        id: uuidv4(),
        name: "Sustainable Supply Chain Co.",
        type: "Logistics",
        criticality: "Critical",
        status: "Active",
        contact: "robert.supply@sustainablechain.com",
        serviceProvided: "Supply Chain Optimization"
    }
];

async function seedVendors() {
    try {
        await mongoose.connect(MONGO_URI);
        await Vendor.deleteMany({});
        const insertedVendors = await Vendor.insertMany(vendorsData);
        console.log(`Successfully inserted ${insertedVendors.length} vendors`);
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding vendors:', error);
        await mongoose.connection.close();
    }
}

seedVendors();