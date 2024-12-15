// Function to toggle between light and dark mode
function toggleTheme() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Function to set the initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.querySelector('html').setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('html').setAttribute('data-theme', 'dark');
    }
}

// Event listener for theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Set initial theme on page load
document.addEventListener('DOMContentLoaded', setInitialTheme);

