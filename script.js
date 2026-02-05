// Loading animation
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function () {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Booking form submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const notes = document.getElementById('notes').value.trim();

    // Greeting based on current time
    const hour = new Date().getHours();
    let greeting = "Hey, good evening";
    if (hour >= 0 && hour < 12) {
        greeting = "Hey, good morning";
    } else if (hour >= 12 && hour < 16) {
        greeting = "Hey, good afternoon";
    }

    // Build the message
    let message = `${greeting}, I'm ${name}. I'd like to book a ${service} appointment on ${date} at ${time}.`;

    if (phone) {
        message += ` My phone number is ${phone}.`;
    }

    if (notes) {
        message += ` Special requests: ${notes}`;
    }

    const whatsappNumber = "254792975947"; // Using the number from contact section

    // WhatsApp URL
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    this.reset();
});
// Gallery images (hardcoded, 6 images)
const galleryImages = [
    {
        src: "images/Jungle green Nails.jpg",
        alt: "Classic French manicure with white tips"
    },
    {
        src: "images/nail4.jpg",
        alt: "Intricate floral nail art design"
    },
    {
        src: "images/nail5.jpg",
        alt: "Glossy red gel polish manicure"
    },
    {
        src: "images/nail8.jpg",
        alt: "Bridal manicure with pearl accents"
    },
    {
        src: "images/nail6.jpg",
        alt: "Luxury pedicure with vibrant red polish"
    },
    {
        src: "images/nail1.jpg",
        alt: "Gold foil nail art design"
    }
];

let currentImageIndex = -1;

// Render gallery images
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item rounded-xl overflow-hidden shadow-md cursor-pointer';
        galleryItem.setAttribute('data-index', index);
        galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" class="w-full h-64 object-cover" loading="lazy">
                `;
        galleryItem.addEventListener('click', () => window.location.href = 'gallery.html');
        galleryGrid.appendChild(galleryItem);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = 'auto';
    currentImageIndex = -1;
}

// Navigate lightbox
function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lightbox').classList.contains('hidden')) {
        if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Swipe navigation for lightbox
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        navigateLightbox(1); // Swipe left -> next
    } else if (touchEndX > touchStartX + swipeThreshold) {
        navigateLightbox(-1); // Swipe right -> previous
    }
}

// Testimonial carousel navigation
function scrollTestimonials(direction) {
    const carousel = document.getElementById('testimonial-carousel');
    const scrollAmount = carousel.clientWidth * 0.33 * direction;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
        }
    });
}
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 1s ease';
});
window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);

// Initialize gallery
renderGallery();

// Set dynamic footer year
document.getElementById('current-year').textContent = new Date().getFullYear();