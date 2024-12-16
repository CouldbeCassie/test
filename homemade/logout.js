document.getElementById('logout-btn').addEventListener('click', function() {
    // Clear session storage
    sessionStorage.removeItem('loggedInUser');
    
    // Redirect to login page
    window.location.href = 'RNGgpus.html'; // Replace 'index.html' with the path to your login page
});
