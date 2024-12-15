// Protect the guilds route
protectRoute();

// Mock data for guilds
let guilds = [
    { id: 1, name: "Code Wizards", members: 15, level: 8, xp: 15000 },
    { id: 2, name: "Bug Hunters", members: 12, level: 6, xp: 10000 },
    { id: 3, name: "Data Miners", members: 10, level: 5, xp: 8000 },
    { id: 4, name: "AI Innovators", members: 8, level: 4, xp: 6000 },
    { id: 5, name: "Web Weavers", members: 14, level: 7, xp: 12000 }
];

// Function to populate the guilds table
function populateGuildsTable(guildsToShow = guilds) {
    const tableBody = document.getElementById('guildTableBody');
    tableBody.innerHTML = guildsToShow.map(guild => `
        <tr>
            <td>${guild.name}</td>
            <td>${guild.members}</td>
            <td>${guild.level}</td>
            <td>${guild.xp}</td>
            <td>
                <button class="btn btn-sm btn-info mr-2" onclick="editGuild(${guild.id})">Edit</button>
                <button class="btn btn-sm btn-error" onclick="deleteGuild(${guild.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Function to handle guild search
function handleGuildSearch() {
    const searchTerm = document.getElementById('guildSearch').value.toLowerCase();
    const filteredGuilds = guilds.filter(guild => 
        guild.name.toLowerCase().includes(searchTerm)
    );
    populateGuildsTable(filteredGuilds);
}

// Function to open the guild modal
function openGuildModal(guildId = null) {
    const modal = document.getElementById('guildModal');
    const modalTitle = document.getElementById('modalTitle');
    const guildNameInput = document.getElementById('guildName');
    const saveButton = document.getElementById('saveGuild');

    if (guildId) {
        const guild = guilds.find(g => g.id === guildId);
        modalTitle.textContent = 'Edit Guild';
        guildNameInput.value = guild.name;
        saveButton.onclick = () => saveGuild(guildId);
    } else {
        modalTitle.textContent = 'Create New Guild';
        guildNameInput.value = '';
        saveButton.onclick = () => saveGuild();
    }

    modal.showModal();
}

// Function to close the guild modal
function closeGuildModal() {
    const modal = document.getElementById('guildModal');
    modal.close();
}

// Function to save (create or edit) a guild
function saveGuild(guildId = null) {
    const guildName = document.getElementById('guildName').value;
    
    if (guildId) {
        // Edit existing guild
        const guildIndex = guilds.findIndex(g => g.id === guildId);
        guilds[guildIndex].name = guildName;
        showNotification(`Guild "${guildName}" updated successfully!`, 'success');
    } else {
        // Create new guild
        const newGuild = {
            id: guilds.length + 1,
            name: guildName,
            members: 1,
            level: 1,
            xp: 0
        };
        guilds.push(newGuild);
        showNotification(`New guild "${guildName}" created successfully!`, 'success');
    }

    closeGuildModal();
    populateGuildsTable();
}

// Function to edit a guild
function editGuild(guildId) {
    openGuildModal(guildId);
}

// Function to delete a guild
function deleteGuild(guildId) {
    if (confirm('Are you sure you want to delete this guild?')) {
        guilds = guilds.filter(guild => guild.id !== guildId);
        populateGuildsTable();
        showNotification('Guild deleted successfully!', 'success');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateGuildsTable();

    document.getElementById('guildSearch').addEventListener('input', handleGuildSearch);
    document.getElementById('createGuildBtn').addEventListener('click', () => openGuildModal());
    document.getElementById('closeModal').addEventListener('click', closeGuildModal);
});

// Initialize the guilds page
showNotification('Welcome to the Guilds page!', 'info');

