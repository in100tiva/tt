// Auth state
let currentUser = null;

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        return true;
    }
    return false;
}

// Login function
function login(username, password, rememberMe = false) {
    // This is a mock login. In a real application, you'd validate against a server.
    if (username === 'demo' && password === 'password') {
        currentUser = { username: 'demo', id: 1 };
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem('user', JSON.stringify(currentUser));
        }
        return true;
    }
    return false;
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Protect routes
function protectRoute() {
    if (!checkAuth()) {
        window.location.href = 'index.html';
    }
}

// Event listener for logout button
document.getElementById('logoutBtn').addEventListener('click', logout);

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        console.log('User is logged in');
    } else {
        console.log('User is not logged in');
    }
});

