document.addEventListener("DOMContentLoaded", function () {
  const generateQrForm = document.getElementById("generateQrForm");
  const scanQrForm = document.getElementById("scanQrForm");
  const paymentForm = document.getElementById("paymentForm");
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const medicineList = document.getElementById("medicineList");

  // Function to generate QR code for doctor's prescription
  generateQrForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(generateQrForm);
    const medicineName = formData.get("medicineName");

    fetch("/generate-qr-prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ medicineName }),
    })
      .then((response) => response.json())
      .then((data) => {
        const qrCodeImage = document.createElement("img");
        qrCodeImage.src = data.qrCode;
        qrCodeContainer.innerHTML = "";
        qrCodeContainer.appendChild(qrCodeImage);
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
        // Display an error message if needed
      });
  });

  // Function to scan QR code for patient's prescription
  scanQrForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const scanQrCodeInput = document.getElementById("scanQrCode");

    // Check if browser supports camera access
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia() is not supported by your browser");
      return;
    }

    // Access the device camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        const video = document.createElement("video");
        video.setAttribute("autoplay", "");
        video.setAttribute("playsinline", "");
        video.srcObject = stream;
        document.body.appendChild(video);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        video.addEventListener("loadedmetadata", function () {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          scanFrame();
        });

        function scanFrame() {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            console.log("Scanned QR code:", code.data);
            // Send scanned QR code data to the backend
            // For demonstration, we'll just display the data
            medicineList.innerHTML = `Scanned QR code: ${code.data}`;
          } else {
            requestAnimationFrame(scanFrame);
          }
        }
      })
      .catch(function (error) {
        console.error("Error accessing the camera:", error);
        // Display an error message if needed
      });
  });

  // Function to process payment
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(paymentForm);
    const paymentAmount = formData.get("paymentAmount");

    fetch("/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: paymentAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Payment successful");
          // Proceed with medicine dispensing
        } else {
          console.error("Payment failed");
          // Display an error message if needed
        }
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        // Display an error message if needed
      });
  });
});
