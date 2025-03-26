import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        // Add validation for UUID format if needed
        validate: {
            validator: function(v: string) {
                // UUID v4 regex pattern
                return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
            },
            message: (props: { value: any; }) => `${props.value} is not a valid UUID!`
        }
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    criticality: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
    status: { type: String, enum: ["Active", "Under Review", "Inactive"], required: true },
    contact: { type: String, unique: true, required: true },
    serviceProvided : {type : String,required : true} 
}, { timestamps: true });

export const Vendor = mongoose.model("Vendor", VendorSchema);