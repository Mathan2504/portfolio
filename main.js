// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const typingText = document.querySelector('.typing-text');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

// --- Navbar Scroll Effect & Active Links ---
window.addEventListener('scroll', () => {
  // Add background to navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update scroll progress bar
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgressBar.style.width = scrolled + '%';
  
  // Highlight active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});

// --- Mobile Menu Toggle ---
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu on link click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  });
});

// --- Typing Effect ---
const roles = [
  "Full Stack Java Developer",
  "Backend Specialist",
  "React Developer",
  "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typingSpeed = isDeleting ? 50 : 100;
  
  // If word is complete
  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before new word
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Initialize typing effect after a short delay
setTimeout(typeEffect, 1000);

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

// Add animation classes to elements
const animateElements = () => {
  // Headings
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
  
  // About section
  document.querySelectorAll('.about-text, .stat-card').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 150}ms`;
    observer.observe(el);
  });
  
  // Skills
  document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 100}ms`;
    observer.observe(el);
  });
  
  // Projects
  document.querySelectorAll('.project-card').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 200}ms`;
    observer.observe(el);
  });
  
  // Timeline items
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 150}ms`;
    observer.observe(el);
  });
  
  // Contact
  document.querySelectorAll('.contact-info, .contact-form-container').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 200}ms`;
    observer.observe(el);
  });
};

// Initialize animations once DOM is loaded
document.addEventListener('DOMContentLoaded', animateElements);

// --- Form Submission Prevention ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;
    
    // Simulate sending
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = '#10b981'; // Success green
      btn.style.borderColor = '#10b981';
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}
