const express = require("express");
const crypto = require("crypto");
const qrcode = require("qrcode");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Function to generate digital signature
function generateDigitalSignature(data) {
  // For demonstration purposes, use SHA256 hashing as digital signature
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route for doctors to generate QR prescriptions
app.post("/generate-prescription", async (req, res) => {
  const { medicineName, doctorLicense } = req.body;
  const signatureData = `Medicine Name: ${medicineName}, Doctor's License: ${doctorLicense}`;
  const digitalSignature = generateDigitalSignature(signatureData);

  try {
    // Generate QR code with prescription data
    const qrData = JSON.stringify({ medicineName, digitalSignature });
    const qrCode = await qrcode.toDataURL(qrData);

    // Send QR code image URL in response
    res.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for users to scan QR codes
app.post("/scan-prescription", (req, res) => {
  // Process scanned QR code data
  const { qrCodeData } = req.body;

  try {
    // Decode QR code data
    const { medicineName, digitalSignature } = JSON.parse(qrCodeData);

    // Verify digital signature
    const signatureData = `Medicine Name: ${medicineName}`;
    const calculatedSignature = generateDigitalSignature(signatureData);

    if (calculatedSignature === digitalSignature) {
      // Digital signature is valid
      // Send medicine name to Arduino (you'll need to implement Arduino communication)
      // Example: sendMedicineNameToArduino(medicineName);

      // Send response to user
      res.json({ success: true, medicineName });
    } else {
      // Digital signature is not valid
      res
        .status(400)
        .json({ success: false, error: "Invalid digital signature" });
    }
  } catch (error) {
    console.error("Error processing scanned QR code data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
