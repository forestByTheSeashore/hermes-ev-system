document.querySelectorAll('.navbar-item').forEach(item => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay); // Add overlay to the body
  
    item.addEventListener('mouseenter', () => {
      let dropdown = item.querySelector('.dropdown');
      
      // Show the dropdown with smooth transition
      dropdown.style.display = 'block';
      setTimeout(() => {
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0)';
      }, 50);  // Slight delay for smooth animation
  
      // Show the overlay with smooth transition
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 50);  // Slight delay to sync with dropdown fade in
    });
  
    item.addEventListener('mouseleave', () => {
      let dropdown = item.querySelector('.dropdown');
      
      // Hide the dropdown with smooth transition
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        dropdown.style.display = 'none';
      }, 300);  // Delay hiding after animation
  
      // Hide the overlay with smooth transition
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';  // Hide overlay after fade out
      }, 300);  // Match the fade-out duration
    });
  });
  // Adding functionality to the "Contact Us" link
document.getElementById('contactUs').addEventListener('click', function() {
    alert('Contact Information:\n\n' +
          'Email: contact@hermes.com\n' +
          'Phone: +123-456-7890\n' +
          'Address: 123 Hermes Street, Vehicle City, EV Land');
  });