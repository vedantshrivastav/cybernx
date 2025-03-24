require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
import router from './routes/vendorroutes'

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/vendors", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
