import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/loyalty_rewards";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Define Customer schema
const CustomerSchema = new mongoose.Schema({
  phone: String,
  visits: { type: Number, default: 1 }
});

const Customer = mongoose.model("Customer", CustomerSchema);

// Check-in route
app.post("/check-in", async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ error: "Phone number is required" });

  let customer = await Customer.findOne({ phone });

  if (customer) {
    customer.visits += 1;
  } else {
    customer = new Customer({ phone });
  }

  await customer.save();
  res.json({ message: "Check-in successful", visits: customer.visits });
});

app.get("/", (req, res) => {
  res.send("Loyalty Rewards API with MongoDB is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
