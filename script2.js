// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // Wait a small moment to ensure assets are rendered before fading out
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    });
    
    // 2. Theme Switching Logic
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check localStorage for preferred theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.className = savedTheme;
    themeSwitch.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeSwitch.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // 3. Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                mainNav.classList.remove('active');
            }
        });
    });


    // 4. Skills Animation Logic (Preparation and Intersection Observer)

const skillsSection = document.getElementById('skills');
const skillsList = document.querySelectorAll('#animated-skills-list li');
let skillsAnimated = false; // Flag to run animation only once

// Pre-process skills list: inject the bar and percentage elements
skillsList.forEach(item => {
    const percentage = item.getAttribute('data-skill');
    
    // Create and append the skill bar
    const bar = document.createElement('div');
    bar.className = 'skill-bar';
    item.appendChild(bar);

    // Create and append the percentage label
    const label = document.createElement('span');
    label.className = 'skill-percentage';
    label.textContent = percentage;
    item.appendChild(label);
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            // When the skills section is visible, run the animation
            skillsList.forEach(item => {
                const percentage = item.getAttribute('data-skill');
                const bar = item.querySelector('.skill-bar');
                
                // Use setTimeout for a slight staggered effect
                setTimeout(() => {
                    // This triggers the CSS transition, making the bar grow smoothly
                    bar.style.width = percentage; 
                }, Math.random() * 200 + 200); // Staggered delay: 200ms to 400ms
            });
            skillsAnimated = true; // Set flag to prevent re-running
            observer.unobserve(skillsSection); // Stop observing after animation
        }
    });
}, { threshold: 0.3 }); // Trigger when 30% of the section is visible

observer.observe(skillsSection);
});