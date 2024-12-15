// Protect the statistics route
protectRoute();

// Mock data for user statistics
const userStats = {
    xpProgress: [100, 250, 400, 600, 850, 1100, 1400],
    challengesCompleted: [5, 8, 12, 15, 20, 22, 25],
    guildContributions: [50, 100, 200, 300, 450, 600, 800],
    skillDistribution: {
        'Problem Solving': 80,
        'Coding': 75,
        'Algorithms': 70,
        'Data Structures': 65,
        'Teamwork': 85
    },
    detailedStats: {
        'Total XP': 1400,
        'Current Level': 14,
        'Challenges Completed': 25,
        'Guild Rank': 5,
        'Achievements Unlocked': 15,
        'Time Spent Coding': '120 hours',
        'Favorite Language': 'Python',
        'Contributions': 42,
        'Longest Streak': '7 days'
    }
};

// Function to create a line chart
function createLineChart(ctx, label, data, color) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to create a radar chart
function createRadarChart(ctx, data) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Skill Level',
                data: Object.values(data),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

// Function to populate detailed statistics
function populateDetailedStats() {
    const tableBody = document.getElementById('detailedStatsBody');
    tableBody.innerHTML = Object.entries(userStats.detailedStats).map(([key, value]) => `
        <tr>
            <td>${key}</td>
            <td>${value}</td>
        </tr>
    `).join('');
}

// Function to initialize charts
function initializeCharts() {
    createLineChart(document.getElementById('xpChart'), 'XP Gained', userStats.xpProgress, 'rgb(75, 192, 192)');
    createLineChart(document.getElementById('challengesChart'), 'Challenges Completed', userStats.challengesCompleted, 'rgb(255, 159, 64)');
    createLineChart(document.getElementById('guildChart'), 'Guild Contributions', userStats.guildContributions, 'rgb(153, 102, 255)');
    createRadarChart(document.getElementById('skillChart'), userStats.skillDistribution);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    populateDetailedStats();
});

// Initialize the statistics page
showNotification('Welcome to your Statistics page!', 'info');

