document.getElementById('generateButton').addEventListener('click', function() {
    const cardTitle = document.getElementById('cardTitle').value;
    const photoUpload = document.getElementById('photoUpload').files[0];
    const selectedTemplate = document.getElementById('templateSelect').value;
    const message = document.getElementById('messageInput').value;

    if (!cardTitle || !photoUpload || !message) {
        alert("Please fill in all fields!");
        return;
    }

    // Create dynamic URL with parameters
    const baseUrl = "https://ishigami-ya.github.io/valentine-generator";
    const params = new URLSearchParams({
        title: cardTitle,
        template: selectedTemplate,
        message: encodeURIComponent(message)
    }).toString();

    // Complete URL to be encoded in the QR code
    const finalUrl = `${baseUrl}?${params}`;

    // Generate QR code (using QRCode.js or another QR code library)
    const qrCodeContainer = document.getElementById('qrCode');
    new QRCode(qrCodeContainer, {
        text: finalUrl,
        width: 128,
        height: 128
    });
});
