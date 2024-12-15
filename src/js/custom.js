// This file is for any custom JavaScript that doesn't fit into the other categories

// Example: Add a welcome message when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        showNotification(`Welcome back, ${currentUser.username}!`, 'success');
    }
});

// Example: Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to populate announcements
function populateAnnouncements() {
    const announcements = [
        { title: "New Challenge Available", date: "2023-06-15" },
        { title: "Guild Tournament Next Week", date: "2023-06-14" },
        { title: "Platform Maintenance", date: "2023-06-13" }
    ];

    const announcementsList = document.getElementById('announcements');
    if (announcementsList) {
        announcementsList.innerHTML = announcements.map(announcement => `
            <li class="mb-2">
                <div class="flex justify-between items-center">
                    <span class="font-semibold">${announcement.title}</span>
                    <span class="text-sm text-gray-500">${announcement.date}</span>
                </div>
            </li>
        `).join('');
    }
}

// Call populateAnnouncements when the DOM is loaded
document.addEventListener('DOMContentLoaded', populateAnnouncements);

// Function to handle search
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    // In a real application, you would send this search term to the server
    console.log(`Searching for: ${searchTerm}`);
    showNotification(`Search results for "${searchTerm}" will be implemented soon.`, 'info');
}

// Add event listener for search form if it exists
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
}

// Function to update online users count (mock data)
function updateOnlineUsers() {
    const onlineUsersElement = document.getElementById('onlineUsers');
    if (onlineUsersElement) {
        const onlineUsers = Math.floor(Math.random() * 100) + 50; // Random number between 50 and 149
        onlineUsersElement.textContent = onlineUsers;
    }
}

// Update online users count every 30 seconds
setInterval(updateOnlineUsers, 30000);
updateOnlineUsers();

// Function to handle real-time notifications (mock implementation)
function setupRealTimeNotifications() {
    // In a real application, this would use WebSockets or Server-Sent Events
    setInterval(() => {
        const notifications = [
            "New challenge available!",
            "Your guild has leveled up!",
            "You've earned a new achievement!",
            "A friend has invited you to join their guild.",
            "Daily login bonus claimed!"
        ];
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        showNotification(randomNotification, 'info', 5000);
    }, 60000); // Show a random notification every minute
}

// Call setupRealTimeNotifications when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupRealTimeNotifications);

// Function to handle logout
function handleLogout() {
    logout(); // This function is defined in auth.js
    showNotification('You have been successfully logged out.', 'success');
    window.location.href = 'index.html'; // Redirect to home page
}

// Add event listener for logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
}

// Function to update user progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('userProgressBar');
    const progressText = document.getElementById('userProgressText');
    if (progressBar && progressText) {
        const currentXP = 7500; // This would come from the user's actual data
        const nextLevelXP = 10000; // This would be calculated based on the user's current level
        const progress = (currentXP / nextLevelXP) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentXP} / ${nextLevelXP} XP`;
    }
}

// Call updateProgressBar when the DOM is loaded
document.addEventListener('DOMContentLoaded', updateProgressBar);

// Function to handle theme toggle
function handleThemeToggle() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showNotification(`Theme changed to ${newTheme} mode`, 'success');
}

// Add event listener for theme toggle button
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', handleThemeToggle);
}

// Function to initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            const rect = e.target.getBoundingClientRect();
            tooltipElement.style.top = `${rect.bottom + window.scrollY}px`;
            tooltipElement.style.left = `${rect.left + window.scrollX}px`;
        });
        tooltip.addEventListener('mouseleave', () => {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });
}

// Initialize tooltips when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTooltips);

// Export functions for use in other modules
export {
    handleSearch,
    updateOnlineUsers,
    setupRealTimeNotifications,
    handleLogout,
    updateProgressBar,
    handleThemeToggle,
    initializeTooltips
};

