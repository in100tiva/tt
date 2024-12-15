// Protect the challenges route
protectRoute();

// Mock data for challenges
const challenges = {
    daily: [
        { id: 1, title: "Code Kata", description: "Complete a coding kata on HackerRank", xp: 50, type: "daily" },
        { id: 2, title: "Bug Fix", description: "Fix a bug in the project repository", xp: 75, type: "daily" },
        { id: 3, title: "Documentation", description: "Improve documentation for a module", xp: 40, type: "daily" }
    ],
    weekly: [
        { id: 4, title: "Feature Implementation", description: "Implement a new feature in the project", xp: 200, type: "weekly" },
        { id: 5, title: "Code Review", description: "Review and provide feedback on 5 pull requests", xp: 150, type: "weekly" },
        { id: 6, title: "Refactoring", description: "Refactor a complex function to improve performance", xp: 180, type: "weekly" }
    ]
};

// Mock data for challenge history
let challengeHistory = [
    { id: 1, title: "Code Kata", type: "daily", completedOn: "2023-06-14", xpEarned: 50 },
    { id: 4, title: "Feature Implementation", type: "weekly", completedOn: "2023-06-10", xpEarned: 200 },
    { id: 2, title: "Bug Fix", type: "daily", completedOn: "2023-06-13", xpEarned: 75 }
];

// Function to populate challenges
function populateChallenges(type = 'daily') {
    const container = document.getElementById('challengesContainer');
    container.innerHTML = challenges[type].map(challenge => `
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">${challenge.title}</h2>
                <p>${challenge.description}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" onclick="openChallengeModal(${challenge.id}, '${type}')">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to populate challenge history
function populateChallengeHistory() {
    const tableBody = document.getElementById('challengeHistoryBody');
    tableBody.innerHTML = challengeHistory.map(challenge => `
        <tr>
            <td>${challenge.title}</td>
            <td>${challenge.type}</td>
            <td>${challenge.completedOn}</td>
            <td>${challenge.xpEarned} XP</td>
        </tr>
    `).join('');
}

// Function to open challenge modal
function openChallengeModal(challengeId, type) {
    const challenge = challenges[type].find(c => c.id === challengeId);
    const modal = document.getElementById('challengeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalReward = document.getElementById('modalReward');
    const startChallengeBtn = document.getElementById('startChallenge');

    modalTitle.textContent = challenge.title;
    modalDescription.textContent = challenge.description;
    modalReward.textContent = `Reward: ${challenge.xp} XP`;

    startChallengeBtn.onclick = () => startChallenge(challenge);

    modal.showModal();
}

// Function to close challenge modal
function closeChallengeModal() {
    const modal = document.getElementById('challengeModal');
    modal.close();
}

// Function to start a challenge
function startChallenge(challenge) {
    // In a real application, this would initiate the challenge and possibly redirect to a challenge page
    showNotification(`Started challenge: ${challenge.title}`, 'success');
    closeChallengeModal();
}

// Function to complete a challenge (for demonstration purposes)
function completeChallenge(challengeId, type) {
    const challenge = challenges[type].find(c => c.id === challengeId);
    const completedChallenge = {
        id: challenge.id,
        title: challenge.title,
        type: challenge.type,
        completedOn: new Date().toISOString().split('T')[0],
        xpEarned: challenge.xp
    };
    challengeHistory.unshift(completedChallenge);
    populateChallengeHistory();
    showNotification(`Completed challenge: ${challenge.title}. Earned ${challenge.xp} XP!`, 'success');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateChallenges('daily');
    populateChallengeHistory();

    document.getElementById('dailyTab').addEventListener('click', () => {
        document.getElementById('dailyTab').classList.add('tab-active');
        document.getElementById('weeklyTab').classList.remove('tab-active');
        populateChallenges('daily');
    });

    document.getElementById('weeklyTab').addEventListener('click', () => {
        document.getElementById('weeklyTab').classList.add('tab-active');
        document.getElementById('dailyTab').classList.remove('tab-active');
        populateChallenges('weekly');
    });

    document.getElementById('closeModal').addEventListener('click', closeChallengeModal);

    // For demonstration purposes, let's complete a challenge when the page loads
    setTimeout(() => completeChallenge(2, 'daily'), 3000);
});

// Initialize the challenges page
showNotification('Welcome to the Challenges page!', 'info');

