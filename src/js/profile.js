// Protect the profile route
protectRoute();

// Mock user data
let userData = {
    name: "John Doe",
    title: "Code Wizard",
    avatar: "/placeholder.svg?height=128&width=128",
    totalXP: 15000,
    currentLevel: 25,
    challengesCompleted: 42,
    recentAchievements: [
        { id: 1, name: "Code Ninja", icon: "🥷" },
        { id: 2, name: "Bug Squasher", icon: "🐛" },
        { id: 3, name: "Data Guru", icon: "📊" },
        { id: 4, name: "Team Player", icon: "🤝" },
        { id: 5, name: "Quick Learner", icon: "🚀" },
        { id: 6, name: "Problem Solver", icon: "🧩" }
    ]
};

// Function to update profile information
function updateProfileInfo() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userTitle').textContent = userData.title;
    document.getElementById('profileAvatar').src= userData.avatar;
    document.getElementById('userAvatar').src = userData.avatar;
    document.getElementById('totalXP').textContent = userData.totalXP.toLocaleString();
    document.getElementById('currentLevel').textContent = userData.currentLevel;
    document.getElementById('challengesCompleted').textContent = userData.challengesCompleted;
}

// Function to populate recent achievements
function populateRecentAchievements() {
    const achievementsContainer = document.getElementById('recentAchievements');
    achievementsContainer.innerHTML = userData.recentAchievements.map(achievement => `
        <div class="flex flex-col items-center justify-center bg-base-200 p-4 rounded-lg">
            <span class="text-4xl mb-2">${achievement.icon}</span>
            <span class="text-sm text-center">${achievement.name}</span>
        </div>
    `).join('');
}

// Function to open edit profile modal
function openEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    document.getElementById('editUserName').value = userData.name;
    document.getElementById('editUserTitle').value = userData.title;
    modal.showModal();
}

// Function to close edit profile modal
function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.close();
}

// Function to save profile changes
function saveProfileChanges() {
    const newName = document.getElementById('editUserName').value;
    const newTitle = document.getElementById('editUserTitle').value;

    if (newName && newTitle) {
        userData.name = newName;
        userData.title = newTitle;
        updateProfileInfo();
        closeEditProfileModal();
        showNotification('Profile updated successfully!', 'success');
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateProfileInfo();
    populateRecentAchievements();

    document.getElementById('editProfileBtn').addEventListener('click', openEditProfileModal);
    document.getElementById('closeEditProfileModal').addEventListener('click', closeEditProfileModal);
    document.getElementById('saveProfile').addEventListener('click', saveProfileChanges);
});

// Initialize the profile page
showNotification('Welcome to your profile!', 'info');

