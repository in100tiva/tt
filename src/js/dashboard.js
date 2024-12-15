// Protect the dashboard route
protectRoute();

// Mock data for dashboard
const mockData = {
    totalXP: 15000,
    currentLevel: 25,
    activeGuilds: 3,
    completedChallenges: 42,
    guilds: [
        { id: 1, name: "Code Wizards", members: 15, level: 8 },
        { id: 2, name: "Bug Hunters", members: 12, level: 6 },
        { id: 3, name: "Data Miners", members: 10, level: 5 }
    ],
    recentActivities: [
        { id: 1, description: "Completed daily challenge", timestamp: "2023-06-15T10:30:00Z" },
        { id: 2, description: "Earned 'Code Ninja' badge", timestamp: "2023-06-14T15:45:00Z" },
        { id: 3, description: "Joined 'Data Miners' guild", timestamp: "2023-06-13T09:00:00Z" }
    ],
    upcomingEvents: [
        { id: 1, name: "Hackathon", date: "2023-06-20T09:00:00Z" },
        { id: 2, name: "AI Workshop", date: "2023-06-25T14:00:00Z" },
        { id: 3, name: "Code Review Session", date: "2023-06-30T11:00:00Z" }
    ],
    recentAchievements: [
        { id: 1, name: "Code Ninja", icon: "🥷" },
        { id: 2, name: "Bug Squasher", icon: "🐛" },
        { id: 3, name: "Data Guru", icon: "📊" },
        { id: 4, name: "Team Player", icon: "🤝" }
    ]
};

// Function to update dashboard statistics
function updateDashboardStats() {
    document.getElementById('totalXP').textContent = mockData.totalXP.toLocaleString();
    document.getElementById('currentLevel').textContent = mockData.currentLevel;
    document.getElementById('activeGuilds').textContent = mockData.activeGuilds;
    document.getElementById('completedChallenges').textContent = mockData.completedChallenges;
}

// Function to populate active guilds list
function populateActiveGuilds() {
    const guildsList = document.getElementById('activeGuildsList');
    guildsList.innerHTML = mockData.guilds.map(guild => `
        <li class="flex justify-between items-center">
            <span>${guild.name}</span>
            <span class="badge badge-primary badge-sm">Level ${guild.level}</span>
        </li>
    `).join('');
}

// Function to populate recent activities list
function populateRecentActivities() {
    const activitiesList = document.getElementById('recentActivitiesList');
    activitiesList.innerHTML = mockData.recentActivities.map(activity => `
        <li class="flex justify-between items-center">
            <span>${activity.description}</span>
            <span class="text-sm text-gray-500">${new Date(activity.timestamp).toLocaleString()}</span>
        </li>
    `).join('');
}

// Function to populate upcoming events list
function populateUpcomingEvents() {
    const eventsList = document.getElementById('upcomingEventsList');
    eventsList.innerHTML = mockData.upcomingEvents.map(event => `
        <li class="flex justify-between items-center">
            <span>${event.name}</span>
            <span class="text-sm text-gray-500">${new Date(event.date).toLocaleString()}</span>
        </li>
    `).join('');
}

// Function to populate recent achievements
function populateRecentAchievements() {
    const achievementsContainer = document.getElementById('recentAchievements');
    achievementsContainer.innerHTML = mockData.recentAchievements.map(achievement => `
        <div class="flex flex-col items-center justify-center bg-base-200 p-4 rounded-lg">
            <span class="text-4xl mb-2">${achievement.icon}</span>
            <span class="text-sm text-center">${achievement.name}</span>
        </div>
    `).join('');
}

// Function to initialize the dashboard
function initDashboard() {
    updateDashboardStats();
    populateActiveGuilds();
    populateRecentActivities();
    populateUpcomingEvents();
    populateRecentAchievements();
    showNotification('Welcome to your dashboard!', 'info');
}

// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDashboard);

