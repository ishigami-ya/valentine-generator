document.getElementById('generateButton').addEventListener('click', function() {
    const cardTitle = document.getElementById('cardTitle').value;
    const message = document.getElementById('messageInput').value;
    const photoUpload = document.getElementById('photoUpload').files[0];
    const selectedTemplate = document.getElementById('templateSelect').value;

    if (!cardTitle || !message) {
        alert("Please fill in all required fields!");
        return;
    }

    // Generate dynamic URL for QR code
    const baseUrl = "https://yourusername.github.io/card-generator"; // Replace with your live URL
    const params = new URLSearchParams({
        title: cardTitle,
        template: selectedTemplate,
        message: encodeURIComponent(message)
    }).toString();

    const finalUrl = `${baseUrl}?${params}`;

    // Generate QR code
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    new QRCode(qrCodeContainer, {
        text: finalUrl,
        width: 128,
        height: 128
    });

    // Preview the generated card
    const cardPreview = document.getElementById('cardPreview');
    cardPreview.innerHTML = `
        <div class="card-template ${selectedTemplate}">
            <h2>${cardTitle}</h2>
            <p>${decodeURIComponent(message)}</p>
        </div>
    `;
});
