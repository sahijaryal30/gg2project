document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle function
    function toggleNav() {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    }

    // Add click event listener
    burger.addEventListener('click', toggleNav);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 2rem';
            navbar.style.backgroundColor = 'rgba(13, 13, 31, 0.95)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.backgroundColor = 'rgba(13, 13, 31, 0.8)';
        }
    });
});

// --------------------------
// Create stars
const starsContainer = document.getElementById('stars');
const planet = document.getElementById('planet');

// Generate stars
function createStars() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // Increase star density for a more impressive starfield
    const starCount = Math.floor((screenWidth * screenHeight) / 1000);

    starsContainer.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Enhanced star properties - more variation in sizes and brightness
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 5 + 2;
        const opacity = Math.random() * 0.8 + 0.2;

        // Set star styles
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', opacity);

        starsContainer.appendChild(star);
    }

    // Add some bigger, brighter stars
    for (let i = 0; i < 20; i++) {
        const brightStar = document.createElement('div');
        brightStar.classList.add('star');

        const size = Math.random() * 2 + 3; // Bigger stars
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 6 + 3;

        brightStar.style.width = `${size}px`;
        brightStar.style.height = `${size}px`;
        brightStar.style.left = `${posX}%`;
        brightStar.style.top = `${posY}%`;
        brightStar.style.setProperty('--duration', `${duration}s`);
        brightStar.style.setProperty('--opacity', 1);
        brightStar.style.boxShadow = '0 0 10px 2px white';

        starsContainer.appendChild(brightStar);
    }

    // Add shooting stars
    createShootingStars();
}

// Create shooting stars
function createShootingStars() {
    const shootingStarCount = 5;

    for (let i = 0; i < shootingStarCount; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const length = Math.random() * 100 + 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 15;

        shootingStar.style.left = `${posX}%`;
        shootingStar.style.top = `${posY}%`;
        shootingStar.style.setProperty('--length', `${length}px`);
        shootingStar.style.setProperty('--duration', `${duration}s`);
        shootingStar.style.setProperty('--delay', `${delay}s`);

        starsContainer.appendChild(shootingStar);
    }
}

// Create cloud patterns on the planet
function createClouds() {
    // Remove existing clouds
    const existingClouds = planet.querySelectorAll('.cloud');
    existingClouds.forEach(cloud => cloud.remove());

    // Add new clouds
    const cloudCount = 8;

    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        // Random cloud properties
        const size = Math.random() * 20 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Set cloud styles
        cloud.style.width = `${size}%`;
        cloud.style.height = `${size}%`;
        cloud.style.left = `${posX}%`;
        cloud.style.top = `${posY}%`;

        planet.appendChild(cloud);
    }
}

// 3D rotation effect on mouse move
function initPlanetRotation() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const xRotation = (y - 0.5) * 30;
        const yRotation = (x - 0.5) * -30;

        planet.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    // Reset rotation when mouse leaves
    document.addEventListener('mouseleave', () => {
        planet.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// Handle window resize
function handleResize() {
    createStars();
}

// Initialize
window.addEventListener('load', () => {
    createStars();
    createClouds();
    initPlanetRotation();

    window.addEventListener('resize', handleResize);
});