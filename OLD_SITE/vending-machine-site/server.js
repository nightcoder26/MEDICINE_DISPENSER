// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const qrcode = require("qrcode");
const crypto = require("crypto");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to generate digital signature
function generateDigitalSignature(data) {
  // For demonstration purposes, use SHA256 hashing as digital signature
  return crypto.createHash("sha256").update(data).digest("hex");
}
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Route for doctors to generate QR prescriptions
app.post("/generate-qr-prescription", async (req, res) => {
  const { medicineName } = req.body;

  try {
    // Generate QR code with prescription data
    const qrData = JSON.stringify({ medicineName });
    const qrCode = await qrcode.toDataURL(qrData);

    // Send QR code image URL in response
    res.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for processing payment
app.post("/process-payment", (req, res) => {
  const { amount } = req.body;

  // For demonstration purposes, simply return success
  res.json({ success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
