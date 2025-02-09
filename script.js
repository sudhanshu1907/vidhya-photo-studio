// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Hero Slideshow
const slideshow = document.getElementById('slideshow');
const slides = [
  'public/7.JPG',
  'public/2.JPG',
  'public/3.JPG',
  'public/4.JPG',
  'public/5.JPG',
  'public/6.JPG'
];

let currentSlide = 0;

function createSlideshow() {
  slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide;
    img.alt = `Wedding photo ${index + 1}`;
    img.className = index === 0 ? 'active' : '';
    slideshow.appendChild(img);
  });
}

function nextSlide() {
  const images = slideshow.getElementsByTagName('img');
  images[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  images[currentSlide].classList.add('active');
}

createSlideshow();
setInterval(nextSlide, 5000);

// Gallery
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxContent = lightbox.querySelector('.lightbox-content');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const galleryMedia = [
  { type: 'image', src: 'public/7.JPG' },
  { type: 'image', src: 'public/2.JPG' },
  { type: 'video', src: 'public/Song 5.mp4' },
  { type: 'image', src: 'public/3.JPG' },
  { type: 'image', src: 'public/4.JPG' },
  { type: 'image', src: 'public/5.JPG' },
  { type: 'video', src: 'public/Song 5.mp4'},
  {type: 'image', src: 'public/6.JPG'},
  {type: 'image', src: 'public/7.JPG'}
];

let currentLightboxItem = 0;

function createGallery() {
  galleryMedia.forEach((media, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    if (media.type === 'image') {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = `Gallery item ${index + 1}`;
      item.appendChild(img);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = media.src;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      item.appendChild(video);
    }
    
    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentLightboxItem = index;
  updateLightboxContent();
  lightbox.classList.add('active');
}

function updateLightboxContent() {
  // Clear existing content
  lightboxContent.innerHTML = '';
  
  const currentMedia = galleryMedia[currentLightboxItem];
  
  if (currentMedia.type === 'image') {
    const img = document.createElement('img');
    img.src = currentMedia.src;
    img.alt = `Gallery item ${currentLightboxItem + 1}`;
    lightboxContent.appendChild(img);
  } else if (currentMedia.type === 'video') {
    const video = document.createElement('video');
    video.src = currentMedia.src;
    video.controls = true;
    video.autoplay = true;
    lightboxContent.appendChild(video);
  }
}

function closeLightbox() {
  lightbox.classList.remove('active');
  // Pause any playing videos
  const videos = document.querySelectorAll('.lightbox-content video');
  videos.forEach(video => video.pause());
}

function showPrevImage() {
  currentLightboxItem = (currentLightboxItem - 1 + galleryMedia.length) % galleryMedia.length;
  updateLightboxContent();
}

function showNextImage() {
  currentLightboxItem = (currentLightboxItem + 1) % galleryMedia.length;
  updateLightboxContent();
}

createGallery();

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the content
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Google Maps Integration
function initMap() {
  const studioLocation = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: studioLocation,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{"color": "#242f3e"}]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"lightness": -80}]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#746855"}]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#d59563"}]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#d59563"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#263c3f"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#6b9a76"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#38414e"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#212a37"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9ca5b3"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"color": "#746855"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#1f2835"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#f3d19c"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#17263c"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#515c6d"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{"lightness": -20}]
      }
    ]
  });

  const marker = new google.maps.Marker({
    position: studioLocation,
    map: map,
    title: 'Luminous Studios'
  });
}

// Initialize map when the API is loaded
window.initMap = initMap;

// Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Here you would typically send the data to your server
  console.log('Form submitted:', data);
  
  // Show success message (you can customize this)
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});


