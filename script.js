// Countdown Logic
const targetDate = new Date("May 26, 2026 00:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  
  if (distance < 0) return;

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  document.getElementById("mins").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  document.getElementById("secs").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Animation Trigger on Envelope Click
const envelope = document.getElementById('envelope');
const container = document.querySelector('.container');

envelope.addEventListener('click', function() {
  this.classList.add('open');
  container.classList.add('revealed'); // This triggers both the zoom and staggered text
});

// Map Tab Logic
// Only handles button highlighting - map stays always visible
function activateTab(clickedButton) {
  // Remove 'active' from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Make clicked button active
  clickedButton.classList.add('active');
}
// Function to generate QR code based on URL parameter
function initializeGuestQR() {
  // 1. Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const guestId = urlParams.get('id'); // Looks for "?id=G001" in the URL

  // 2. If a guest ID exists in the link, show the QR code
  if (guestId) {
    const qrSection = document.getElementById('qr-section');
    const qrImage = document.getElementById('qr-image');
    const guestIdDisplay = document.getElementById('guest-id-display');

    // Make the section visible
    qrSection.style.display = 'block';

    // Call the free QR API to generate a QR code containing their ID
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${guestId}`;
    
    // Display their ID below the QR for manual verification just in case
    guestIdDisplay.innerText = `ID: ${guestId}`;
  }
}

// Run the function when the page loads
window.addEventListener('DOMContentLoaded', initializeGuestQR);