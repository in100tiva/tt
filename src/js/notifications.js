// Queue to store notifications
let notificationQueue = [];

// Function to create and show a notification
function showNotification(message, type = 'info', duration = 3000) {
    const notification = {
        message,
        type,
        duration,
        id: Date.now()
    };

    notificationQueue.push(notification);
    processNotificationQueue();
}

// Function to process the notification queue
function processNotificationQueue() {
    if (notificationQueue.length === 0) return;

    const notification = notificationQueue.shift();
    const container = document.getElementById('notificationContainer');
    const notificationElement = document.createElement('div');
    notificationElement.className = `alert alert-${notification.type} shadow-lg mb-4 transition-opacity duration-300 opacity-0`;
    notificationElement.innerHTML = `
        <div>
            <span>${notification.message}</span>
        </div>
        <div class="flex-none">
            <button class="btn btn-sm btn-ghost" onclick="dismissNotification(${notification.id})">Dismiss</button>
        </div>
    `;
    container.appendChild(notificationElement);

    // Fade in
    setTimeout(() => {
        notificationElement.classList.remove('opacity-0');
    }, 50);

    // Remove the notification after the specified duration
    setTimeout(() => {
        dismissNotification(notification.id);
    }, notification.duration);
}

// Function to dismiss a notification
function dismissNotification(id) {
    const container = document.getElementById('notificationContainer');
    const notificationElement = container.querySelector(`[data-id="${id}"]`);
    if (notificationElement) {
        notificationElement.classList.add('opacity-0');
        setTimeout(() => {
            container.removeChild(notificationElement);
            processNotificationQueue();
        }, 300);
    }
}

// Example usage:
// showNotification('Welcome to the platform!', 'success');
// showNotification('An error occurred.', 'error');
// showNotification('Don't forget to complete your daily challenge!', 'warning');

