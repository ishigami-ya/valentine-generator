document.getElementById('generateButton').addEventListener('click', function() {
    const cardTitle = document.getElementById('cardTitle').value;
    const photoUpload = document.getElementById('photoUpload').files[0];
    const selectedTemplate = document.getElementById('templateSelect').value;
    const message = document.getElementById('messageInput').value;

    if (!cardTitle || !photoUpload || !message) {
        alert("Please fill in all fields!");
        return;
    }

    // 1. Preview Card Generation
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageSrc = event.target.result; // the image data URL
        
        // Generate the HTML for the preview card
        let cardHtml = `
            <div class="card ${selectedTemplate}">
                <img src="${imageSrc}" alt="Crush's Picture">
                <h2>${cardTitle}</h2>
                <p>${message}</p>
            </div>
        `;
        
        // Display the preview card
        document.getElementById('cardPreview').innerHTML = cardHtml;
        document.getElementById('cardPreview').style.display = 'block';

        // 2. Generate the URL for the QR code (passing card parameters in the URL)
        const cardUrl = generateCardUrl(cardTitle, selectedTemplate, message);
        
        // 3. Generate QR Code
        generateQRCode(cardUrl);
    };
    reader.readAsDataURL(photoUpload);
});

// Function to generate a URL with parameters for the card (excluding image)
function generateCardUrl(cardTitle, selectedTemplate, message) {
    const baseUrl = window.location.origin + "/card"; // URL for the card page
    const params = new URLSearchParams({
        title: cardTitle,
        template: selectedTemplate,
        message: encodeURIComponent(message)
    }).toString();

    return baseUrl + "?" + params; // Return the full URL for the QR code
}

// Function to generate the QR code
function generateQRCode(cardUrl) {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(cardUrl)}&size=200x200`;
    const qrCodeImg = `<img src="${qrCodeUrl}" alt="QR Code for Card">`;
    document.getElementById('qrCode').innerHTML = qrCodeImg;
}
