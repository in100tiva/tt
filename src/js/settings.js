// Protect the settings route
protectRoute();

// Mock user settings
let userSettings = {
    emailNotifications: true,
    pushNotifications: true,
    challengeReminders: false,
    guildUpdates: true,
    showProfile: true,
    showAchievements: true,
    allowInvites: true,
    email: "user@example.com"
};

// Function to load user settings
function loadUserSettings() {
    document.getElementById('emailNotifications').checked = userSettings.emailNotifications;
    document.getElementById('pushNotifications').checked = userSettings.pushNotifications;
    document.getElementById('challengeReminders').checked = userSettings.challengeReminders;
    document.getElementById('guildUpdates').checked = userSettings.guildUpdates;
    document.getElementById('showProfile').checked = userSettings.showProfile;
    document.getElementById('showAchievements').checked = userSettings.showAchievements;
    document.getElementById('allowInvites').checked = userSettings.allowInvites;
    document.getElementById('userEmail').value = userSettings.email;
}

// Function to save user settings
function saveUserSettings() {
    userSettings.emailNotifications = document.getElementById('emailNotifications').checked;
    userSettings.pushNotifications = document.getElementById('pushNotifications').checked;
    userSettings.challengeReminders = document.getElementById('challengeReminders').checked;
    userSettings.guildUpdates = document.getElementById('guildUpdates').checked;
    userSettings.showProfile = document.getElementById('showProfile').checked;
    userSettings.showAchievements = document.getElementById('showAchievements').checked;
    userSettings.allowInvites = document.getElementById('allowInvites').checked;
    userSettings.email = document.getElementById('userEmail').value;

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword || confirmPassword) {
        if (newPassword === confirmPassword) {
            // In a real application, you would hash the password and send it to the server
            console.log("Password changed successfully");
            showNotification("Password changed successfully", "success");
        } else {
            showNotification("Passwords do not match", "error");
            return;
        }
    }

    // In a real application, you would send these settings to the server
    console.log("Settings saved:", userSettings);
    showNotification("Settings saved successfully", "success");
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadUserSettings();

    document.getElementById('saveSettings').addEventListener('click', saveUserSettings);
});

// Initialize the settings page
showNotification('Welcome to the Settings page!', 'info');

