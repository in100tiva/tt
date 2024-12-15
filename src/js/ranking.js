// Protect the ranking route
protectRoute();

// Mock data for rankings
const rankings = {
    global: [
        { id: 1, name: "Tech High", score: 15000, level: 25 },
        { id: 2, name: "Code Academy", score: 14500, level: 24 },
        { id: 3, name: "Dev School", score: 14000, level: 23 },
        { id: 4, name: "Byte College", score: 13500, level: 22 },
        { id: 5, name: "Programming Institute", score: 13000, level: 21 }
    ],
    guild: [
        { id: 1, name: "Code Wizards", score: 5000, level: 15 },
        { id: 2, name: "Bug Hunters", score: 4800, level: 14 },
        { id: 3, name: "Data Miners", score: 4600, level: 13 },
        { id: 4, name: "AI Innovators", score: 4400, level: 12 },
        { id: 5, name: "Web Weavers", score: 4200, level: 11 }
    ],
    individual: [
        { id: 1, name: "John Doe", score: 2000, level: 10 },
        { id: 2, name: "Jane Smith", score: 1900, level: 9 },
        { id: 3, name: "Bob Johnson", score: 1800, level: 8 },
        { id: 4, name: "Alice Brown", score: 1700, level: 7 },
        { id: 5, name: "Charlie Davis", score: 1600, level: 6 }
    ]
};

// Current ranking type
let currentRankingType = 'global';

// Function to populate ranking table
function populateRankingTable(type = 'global') {
    const tableBody = document.getElementById('rankingTableBody');
    tableBody.innerHTML = rankings[type].map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}</td>
            <td>${item.level}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="openRankingModal(${item.id}, '${type}')">View Details</button>
            </td>
        </tr>
    `).join('');
}

// Function to open ranking modal
function openRankingModal(id, type) {
    const item = rankings[type].find(i => i.id === id);
    const modal = document.getElementById('rankingModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = `${item.name} Details`;
    modalContent.innerHTML = `
        <p><strong>Rank:</strong> ${rankings[type].findIndex(i => i.id === id) + 1}</p>
        <p><strong>Score:</strong> ${item.score}</p>
        <p><strong>Level:</strong> ${item.level}</p>
        <p><strong>XP to Next Level:</strong> ${1000 - (item.score % 1000)}</p>
    `;

    modal.showModal();
}

// Function to close ranking modal
function closeRankingModal() {
    const modal = document.getElementById('rankingModal');
    modal.close();
}

// Function to handle period filter change
function handlePeriodFilterChange() {
    const period = document.getElementById('periodFilter').value;
    // In a real application, this would fetch new data based on the selected period
    showNotification(`Ranking updated for ${period}`, 'info');
    populateRankingTable(currentRankingType);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateRankingTable('global');

    document.getElementById('globalTab').addEventListener('click', () => {
        document.getElementById('globalTab').classList.add('tab-active');
        document.getElementById('guildTab').classList.remove('tab-active');
        document.getElementById('individualTab').classList.remove('tab-active');
        currentRankingType = 'global';
        populateRankingTable('global');
    });

    document.getElementById('guildTab').addEventListener('click', () => {
        document.getElementById('guildTab').classList.add('tab-active');
        document.getElementById('globalTab').classList.remove('tab-active');
        document.getElementById('individualTab').classList.remove('tab-active');
        currentRankingType = 'guild';
        populateRankingTable('guild');
    });

    document.getElementById('individualTab').addEventListener('click', () => {
        document.getElementById('individualTab').classList.add('tab-active');
        document.getElementById('globalTab').classList.remove('tab-active');
        document.getElementById('guildTab').classList.remove('tab-active');
        currentRankingType = 'individual';
        populateRankingTable('individual');
    });

    document.getElementById('periodFilter').addEventListener('change', handlePeriodFilterChange);

    document.getElementById('closeModal').addEventListener('click', closeRankingModal);
});

// Initialize the ranking page
showNotification('Welcome to the Ranking page!', 'info');

