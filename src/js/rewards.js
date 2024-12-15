// Protect the rewards route
protectRoute();

// Mock data for rewards
const rewards = [
    { id: 1, name: "1-Month Premium Subscription", type: "digital", points: 500, description: "Get access to premium features for 1 month" },
    { id: 2, name: "Custom T-Shirt", type: "physical", points: 1000, description: "A high-quality t-shirt with your favorite coding language" },
    { id: 3, name: "Exclusive Workshop Access", type: "exclusive", points: 1500, description: "Join an exclusive online workshop with industry experts" },
    { id: 4, name: "E-book Bundle", type: "digital", points: 300, description: "A collection of 5 e-books on various programming topics" },
    { id: 5, name: "Branded Hoodie", type: "physical", points: 1200, description: "Stay warm and stylish with our branded hoodie" },
    { id: 6, name: "1-on-1 Mentoring Session", type: "exclusive", points: 2000, description: "Get personalized guidance from a senior developer" }
];

// Mock data for redemption history
let redemptionHistory = [
    { id: 1, name: "1-Month Premium Subscription", type: "digital", redeemedOn: "2023-06-10", pointsSpent: 500 },
    { id: 2, name: "E-book Bundle", type: "digital", redeemedOn: "2023-06-05", pointsSpent: 300 }
];

// Current filter and sort settings
let currentFilter = 'all';
let currentSort = 'price-asc';

// Function to populate rewards
function populateRewards() {
    const container = document.getElementById('rewardsContainer');
    let filteredRewards = rewards;

    if (currentFilter !== 'all') {
        filteredRewards = rewards.filter(reward => reward.type === currentFilter);
    }

    filteredRewards.sort((a, b) => {
        switch (currentSort) {
            case 'price-asc':
                return a.points - b.points;
            case 'price-desc':
                return b.points - a.points;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
        }
    });

    container.innerHTML = filteredRewards.map(reward => `
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">${reward.name}</h2>
                <p>${reward.description}</p>
                <div class="card-actions justify-end">
                    <span class="text-xl font-bold">${reward.points} points</span>
                    <button class="btn btn-primary" onclick="openRewardModal(${reward.id})">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to populate redemption history
function populateRedemptionHistory() {
    const tableBody = document.getElementById('redemptionHistoryBody');
    tableBody.innerHTML = redemptionHistory.map(redemption => `
        <tr>
            <td>${redemption.name}</td>
            <td>${redemption.type}</td>
            <td>${redemption.redeemedOn}</td>
            <td>${redemption.pointsSpent} points</td>
        </tr>
    `).join('');
}

// Function to open reward modal
function openRewardModal(rewardId) {
    const reward = rewards.find(r => r.id === rewardId);
    const modal = document.getElementById('rewardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const redeemButton = document.getElementById('redeemReward');

    modalTitle.textContent = reward.name;
    modalContent.innerHTML = `
        <p>${reward.description}</p>
        <p class="mt-4"><strong>Type:</strong> ${reward.type}</p>
        <p><strong>Points required:</strong> ${reward.points}</p>
    `;

    redeemButton.onclick = () => redeemReward(reward);

    modal.showModal();
}

// Function to close reward modal
function closeRewardModal() {
    const modal = document.getElementById('rewardModal');
    modal.close();
}

// Function to redeem a reward
function redeemReward(reward) {
    // In a real application, this would check the user's points balance and handle the redemption process
    const redemption = {
        id: redemptionHistory.length + 1,
        name: reward.name,
        type: reward.type,
        redeemedOn: new Date().toISOString().split('T')[0],
        pointsSpent: reward.points
    };
    redemptionHistory.unshift(redemption);
    populateRedemptionHistory();
    showNotification(`Successfully redeemed: ${reward.name}`, 'success');
    closeRewardModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateRewards();
    populateRedemptionHistory();

    document.getElementById('allRewardsTab').addEventListener('click', () => {
        currentFilter = 'all';
        updateActiveTab('allRewardsTab');
        populateRewards();
    });

    document.getElementById('digitalRewardsTab').addEventListener('click', () => {
        currentFilter = 'digital';
        updateActiveTab('digitalRewardsTab');
        populateRewards();
    });

    document.getElementById('physicalRewardsTab').addEventListener('click', () => {
        currentFilter = 'physical';
        updateActiveTab('physicalRewardsTab');
        populateRewards();
    });

    document.getElementById('exclusiveRewardsTab').addEventListener('click', () => {
        currentFilter = 'exclusive';
        updateActiveTab('exclusiveRewardsTab');
        populateRewards();
    });

    document.getElementById('sortFilter').addEventListener('change', (e) => {
        currentSort = e.target.value;
        populateRewards();
    });

    document.getElementById('closeModal').addEventListener('click', closeRewardModal);
});

// Function to update active tab
function updateActiveTab(activeTabId) {
    const tabs = ['allRewardsTab', 'digitalRewardsTab', 'physicalRewardsTab', 'exclusiveRewardsTab'];
    tabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tabId === activeTabId) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    });
}

// Initialize the rewards page
showNotification('Welcome to the Rewards page!', 'info');

